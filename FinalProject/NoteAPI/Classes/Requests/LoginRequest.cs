using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NoteAPI.Scaffolding;
using System;
using System.Linq;

namespace NoteAPI.Classes
{
    public class LoginRequest
    {
        public string UsernameOrEmail { get; set; }
        public string Password { get; set; }
        public string SessionID { get; set; }

        public string AttemptLogin(CSC425Context db, String IPAddress) 
        {
            // Check to make sure a user exists with the given name or email address
            var user = db.Users.Where(u => u.Username.ToLower().Equals(UsernameOrEmail.ToLower())).FirstOrDefault();

            if (user == null)
            {
                user = db.Users.Where(u => u.EmailAddress.ToLower().Equals(UsernameOrEmail.ToLower())).FirstOrDefault();

                if (user == null)
                {
                    return JsonConvert.SerializeObject(new ReturnCode(404, "Not Found", "User with that name or email address does not exist"));
                }
            }

            if (user.IsVerified)
            {
                if (user.LoginAttempts < 5)
                {
                    // User exists, time to attempt log in
                    // Check if password is correct
                    var passwordToCheck = Security.SHA256(Security.Pepper + Password + user.Salt);
                    if (user.Password.Equals(passwordToCheck))
                    {
                        // Password is correct, Login successful
                        Logins login = new Logins();
                        login.UsersID = user.UserId;
                        login.Ipaddress = IPAddress;
                        login.LoginDate = DateTime.Now;
                        login.Used2Fa = false;
                        db.Logins.Add(login);
                        // Maybe replace this with JSON object that returns a session ID
                        var sessionID = Security.Generate(32);
                        user.SessionId = sessionID;
                        user.LoginAttempts = 0;
                        db.SaveChangesAsync();
                        return JsonConvert.SerializeObject(new ReturnCode(200, "OK", $"{sessionID}"));
                    }

                    // Failed attempt should increment the counter
                    user.LoginAttempts = (user.LoginAttempts += 1);
                    db.SaveChangesAsync();
                    return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", $"Password was incorrect"));
                }
                else // If you've entered the failed password 6 times
                {
                    // Sets up a timed lockout
                    var lockout = 5; // Minutes to lock the account.
                    var task = $"DROP EVENT IF EXISTS {user.Username}_Lockout; CREATE EVENT IF NOT EXISTS {user.Username}_Lockout " +
                               $"ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL {lockout} MINUTE " +
                               $"ON COMPLETION PRESERVE " +
                               $"DO " +
                               $"UPDATE CSC425.Users SET Users.LoginAttempts = 0 WHERE Users.Username = \"{user.Username}\";";
                    db.Database.ExecuteSqlRawAsync(task);


                    return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", $"Too many failed login attempts. Account locked for {lockout} minutes. Try logging in later."));
                }
            }
            else
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", $"Email Address not verified"));
            }
           
        }
        public string SessionIDOverride(CSC425Context db, String IPAddress) 
        {
            // Check to make sure a user exists with the given name or email address
            var user = db.Users.Where(u => u.Username.ToLower().Equals(UsernameOrEmail.ToLower())).FirstOrDefault();

            if (user == null)
            {
                user = db.Users.Where(u => u.EmailAddress.ToLower().Equals(UsernameOrEmail.ToLower())).FirstOrDefault();

                if (user == null)
                {
                    return JsonConvert.SerializeObject(new ReturnCode(404, "Not Found", "Username or Email Address is invalid"));
                }
            }

            // User is properly logged in
            if (user.SessionId.Equals(SessionID)) 
            {
                return JsonConvert.SerializeObject(new ReturnCode(200, "OK", $"{SessionID}"));
            }

            // User failed log in
            user.SessionId = null;
            db.SaveChangesAsync();
            return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", $"Incorrect SessionID"));
        }
    }
}

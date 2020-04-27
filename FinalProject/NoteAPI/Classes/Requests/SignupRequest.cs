using Newtonsoft.Json;
using NoteAPI.Classes.Email;
using NoteAPI.Scaffolding;
using System;
using System.Linq;

namespace NoteAPI.Classes
{
    public class SignupRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Signup(CSC425Context db, String IPAddress)
        {
            var user = db.Users.Where(u => u.EmailAddress.ToLower().Equals(Email.ToLower())).FirstOrDefault();

            if (user == null)
            {
                user = db.Users.Where(u => u.Username.ToLower().Equals(Username.ToLower())).FirstOrDefault();

                if (user == null)
                {
                    SendEmails email = new SendEmails();

                    var salt = Security.Generate(128);
                    var secret = Security.Generate(64);
                    var passwordToSave = Security.SHA256(Security.Pepper + Password + salt);

                    // Create new user
                    user = new Users();

                    user.Username = Username;
                    user.EmailAddress = Email;
                    user.Salt = salt;
                    user.Password = passwordToSave;
                    user.UserRole = "User";
                    user.CreationIp = IPAddress;
                    user.VerificationIp = "0.0.0.0";
                    user.Use2Fa = false;
                    user.LoginAttempts = 0;
                    user.SecretKey = secret;

                    db.Users.Add(user);
                    db.SaveChangesAsync();

                    email.SendMessage(new System.Net.Mail.MailAddress(user.EmailAddress, user.Username), "Please verify your account on Rohzek's Note Service", $"Hello!\n\nPlease click this link to verify your account: http://rohzek.cf:8080/api/v1/verify?verification_code={user.SecretKey}");

                    return JsonConvert.SerializeObject(new ReturnCode(100, "Continue", "User created successfully, awaiting email verification"));
                }
            }

            return JsonConvert.SerializeObject(new ReturnCode(409, "Conflict", $"User with username: {Username} and/or Email Address: {Email} already exists."));
        }
    }
}

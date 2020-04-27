using Newtonsoft.Json;
using NoteAPI.Classes.Email;
using NoteAPI.Scaffolding;
using System;
using System.Linq;

namespace NoteAPI.Classes
{
    public class UserInfoRequest
    {
        public string CurrentUsername { get; set; }
        public string NewUsername { get; set; }
        public string CurrentEmailAddress { get; set; }
        public string NewEmailAddress { get; set; }
        public string Password { get; set; }

        public string UsernameAndPasswordUpdate(CSC425Context db, String IPAddress)
        {
            // Check to make sure a user exists with the given name or email address
            var user = db.Users.Where(u => u.Username.ToLower().Equals(CurrentUsername.ToLower())).FirstOrDefault();

            if (user == null)
            {
                return JsonConvert.SerializeObject(new ReturnCode(404, "Not Found", "Username is invalid"));
            }

            SendEmails email = new SendEmails();

            var salt = Security.Generate(128);
            var secret = Security.Generate(64);

            // Change username/password
            user.Username = NewUsername;
            user.EmailAddress = NewEmailAddress;
            user.Password = Security.SHA256(Security.Pepper + Password + salt);
            user.Salt = salt;
            user.IsVerified = false;
            user.SecretKey = secret;
            db.SaveChangesAsync();

            email.SendMessage(new System.Net.Mail.MailAddress(user.EmailAddress, user.Username), "Please verify your account on Rohzek's Note Service", $"Hello!\n\nPlease click this link to verify your account: https://rohzek.cf:8080/api/v1/verify?verification_code={user.SecretKey}");

            return JsonConvert.SerializeObject(new SessionIDHolder(user.Username, user.SessionId));
        }
    }
}

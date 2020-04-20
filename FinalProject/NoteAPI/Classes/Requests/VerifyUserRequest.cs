using Newtonsoft.Json;
using NoteAPI.Scaffolding;
using System.Linq;

namespace NoteAPI.Classes
{
    public class VerifyUserRequest
    {
        public string Secret { get; set; }

        public VerifyUserRequest(string secret) 
        {
            Secret = secret;
        }

        public string AttemptVerification(CSC425Context db, string IPAddress) 
        {
            var user = db.Users.Where(u => u.SecretKey.Equals(Secret)).FirstOrDefault();

            if (user == null)
            {
                return JsonConvert.SerializeObject(new ReturnCode(401, "Unauthorized", $"Verification Code was incorrect."));
            }

            user.IsVerified = true;
            user.SecretKey = null;
            user.VerificationIp = IPAddress;
            db.SaveChangesAsync();

            // Maybe make this a little more fancy? We should be able to return an HTML page with this.
            return "Thank you. User was verified successfully.";

        }
    }
}

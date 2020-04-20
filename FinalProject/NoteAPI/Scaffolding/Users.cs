using System;
using System.Collections.Generic;

namespace NoteAPI.Scaffolding
{
    public partial class Users
    {
        public Users()
        {
            Logins = new HashSet<Logins>();
            NoteViewers = new HashSet<NoteViewers>();
            Notes = new HashSet<Notes>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string UserRole { get; set; }
        public string CreationIp { get; set; }
        public string VerificationIp { get; set; }
        public bool Use2Fa { get; set; }
        public int LoginAttempts { get; set; }
        public string SessionId { get; set; }
        public string SecretKey { get; set; }
        public string Secret2FA { get; set; }
        public bool IsVerified { get; set; }
        public string Gender { get; set; }
        public DateTime? Birthday { get; set; }

        public virtual ICollection<Logins> Logins { get; set; }
        public virtual ICollection<NoteViewers> NoteViewers { get; set; }
        public virtual ICollection<Notes> Notes { get; set; }
    }
}

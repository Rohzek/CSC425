using System;

namespace NoteAPI.Scaffolding
{
    public partial class Logins
    {
        public int LoginsId { get; set; }
        public int UsersID { get; set; }
        public string Ipaddress { get; set; }
        public DateTime LoginDate { get; set; }
        public bool Used2Fa { get; set; }

        public virtual Users Users { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoteAPI.Classes
{
    public class SessionIDHolder
    {
        public string Username { get; set; }
        public string SessionID { get; set; }

        public SessionIDHolder(string username, string sessionID) 
        {
            Username = username;
            SessionID = sessionID;
        }
    }
}

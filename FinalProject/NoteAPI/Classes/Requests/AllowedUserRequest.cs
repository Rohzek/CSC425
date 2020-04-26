using Newtonsoft.Json;
using NoteAPI.Scaffolding;
using System.Diagnostics;
using System.Linq;

namespace NoteAPI.Classes.Requests
{
    public class AllowedUserRequest
    {
        public int NoteID { get; set; }
        public string Username { get; set; }

        public AllowedUserRequest() { }

        public AllowedUserRequest(int noteID, string username) 
        {
            this.NoteID = noteID;
            this.Username = username;
        }

        public string AddUser(CSC425Context db) 
        {
            var user = db.Users.Where(u => u.Username.ToLower().Equals(Username.ToLower())).FirstOrDefault();

            if (user == null) 
            {
                return JsonConvert.SerializeObject(new ReturnCode(404, "Not Found", $"User: {Username} doesn't exist."));
            }

            var nv = db.NoteViewers.Where(n => n.NoteId.Equals(this.NoteID) && n.UserId.Equals(user.UserId)).FirstOrDefault();

            if (nv != null) 
            {
                return JsonConvert.SerializeObject(new ReturnCode(403, "Forbidden", $"User: {Username} is already allowed to view this note."));
            }

            var noteviewer = new NoteViewers();
            noteviewer.NoteId = this.NoteID;
            noteviewer.UserId = user.UserId;

            db.NoteViewers.Add(noteviewer);
            db.SaveChangesAsync();

            return JsonConvert.SerializeObject(new ReturnCode(200, "OK", $"User: {Username} added successfully."));
        }

        public string RemoveUser(CSC425Context db) 
        {
            var user = db.Users.Where(u => u.Username.ToLower().Equals(Username.ToLower())).FirstOrDefault();

            if (user == null)
            {
                return JsonConvert.SerializeObject(new ReturnCode(404, "Not Found", $"User: {Username} doesn't exist."));
            }

            var nv = db.NoteViewers.Where(n => n.NoteId.Equals(this.NoteID) && n.UserId.Equals(user.UserId)).FirstOrDefault();

            if (nv == null)
            {
                return JsonConvert.SerializeObject(new ReturnCode(403, "Forbidden", $"User: {Username} already isn't allowed to view this note."));
            }

            db.NoteViewers.Remove(nv);
            db.SaveChangesAsync();

            return JsonConvert.SerializeObject(new ReturnCode(200, "OK", $"User: {Username} removed successfully."));
        }
    }
}

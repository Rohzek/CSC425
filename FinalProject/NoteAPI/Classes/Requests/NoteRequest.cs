using Newtonsoft.Json;
using NoteAPI.Scaffolding;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

namespace NoteAPI.Classes.Requests
{
    public class NoteRequest : IComparable<NoteRequest>
    {
        public string Username { get; set; }
        public int NoteID { get; set; }
        public string ClassID { get; set; }
        public string Note { get; set; }
        public byte[] NoteFile { get; set; }
        public string NoteFileName { get; set; }
        public string Extension { get; set; }
        public DateTime NoteDate { get; set; }
        public DateTime UploadDate { get; set; }
        public string[] Users { get; set; }

        public NoteRequest() { }

        public NoteRequest(CSC425Context db, Notes note, Users user) 
        {
            Username = user.Username;
            NoteID = note.NotesId;
            ClassID = note.ClassId;
            Note = note.Note;
            NoteFile = note.NoteFile;
            NoteFileName = note.NoteFileName;
            Extension = note.Extension;
            NoteDate = note.NoteDate;
            UploadDate = note.UploadDate;

            var noteviewers = db.NoteViewers.Where(n => n.NoteId.Equals(NoteID)).ToList();
            var list = new List<string>();

            foreach (NoteViewers nv in noteviewers)
            {
                var usr = db.Users.Where(u => u.UserId.Equals(nv.UserId)).FirstOrDefault();
                list.Add(user.Username);
            }

            Users = list.ToArray();
        }

        public string AddNote(CSC425Context db) 
        {
            var noteCreator = db.Users.Where(u => u.Username.ToLower().Equals(Username.ToLower())).FirstOrDefault();

            if (NoteDate.Year == 0001) 
            {
                this.NoteDate = DateTime.Now;
            }

            this.UploadDate = DateTime.Now;

            Notes note = new Notes();
            note.UserId = noteCreator.UserId;
            note.ClassId = this.ClassID;
            note.Note = this.Note;
            note.NoteFile = this.NoteFile;
            note.NoteFileName = this.NoteFileName;
            note.Extension = this.Extension;
            note.NoteDate = this.NoteDate;
            note.UploadDate = this.UploadDate;

            foreach (string user in Users) 
            {
                var allowedUser = db.Users.Where(u => u.Username.ToLower() == user.ToLower()).FirstOrDefault();

                if (allowedUser != null)
                {
                    NoteViewers nv = new NoteViewers();
                    nv.NoteId = note.NotesId;
                    nv.UserId = allowedUser.UserId;
                    
                    note.NoteViewers.Add(nv);
                }
            }

            db.Notes.Add(note);
            db.SaveChangesAsync();

            return JsonConvert.SerializeObject(new ReturnCode(200, "OK", $"Note added successfully."));
        }

        public string UpdateNote(CSC425Context db) 
        {
            // Note sure if I want to implement this? I doubt notes change. If they do, you can just reupload.
            // Leave this here as a placeholder for now though.
            return JsonConvert.SerializeObject(new ReturnCode(200, "OK", $"Note added successfully."));
        }

        public string DeleteNote(CSC425Context db) 
        {
            var noteviewers = db.NoteViewers.Where(n => n.NoteId.Equals(NoteID)).ToList();

            if (noteviewers.Count > 0) 
            {
                foreach (NoteViewers nv in noteviewers)
                {
                    db.NoteViewers.Remove(nv);
                }
            }
            
            var note = db.Notes.Where(n => n.NotesId.Equals(NoteID)).FirstOrDefault();

            if (note != null) 
            {
                db.Notes.Remove(note);
            }

            db.SaveChangesAsync();

            return JsonConvert.SerializeObject(new ReturnCode(200, "OK", $"Note with ID {NoteID} deleted successfully."));
        }

        public static string GetNote(CSC425Context db, string username)
        {
            return JsonConvert.SerializeObject(GetAllowedNotes(db, username));
        }

        public static string GetNote(CSC425Context db, string username, string search)
        {
            var results = GetAllowedNotes(db, username);
            var output = new List<NoteRequest>();

            foreach (NoteRequest note in results) 
            {
                if (Regex.IsMatch(note.ClassID, search, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(note.Note, search, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(note.NoteFileName, search, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(note.Extension, search, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(note.NoteDate.ToString(), search, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(note.UploadDate.ToString(), search, RegexOptions.IgnoreCase))
                {
                    output.Add(note);
                }
                
            }

            return JsonConvert.SerializeObject(output);
        }

        private static List<NoteRequest> GetAllowedNotes(CSC425Context db, string username) 
        {
            // Get user account that's requesting notes
            var user = db.Users.Where(u => u.Username.ToLower().Equals(username.ToLower())).FirstOrDefault();
            // Gets notes where you're an allowed viewer, or an owner.
            var viewers = db.NoteViewers.Where(u => (u.UserId.Equals(user.UserId))).ToList<NoteViewers>();
            var oNotes = db.Notes.Where(u => u.UserId.Equals(user.UserId));
            List<Notes> notes = new List<Notes>();
            List<NoteRequest> output = new List<NoteRequest>();

            // Allowed notes
            foreach (NoteViewers viewer in viewers)
            {
                notes.Add(db.Notes.Where(n => n.NotesId.Equals(viewer.NoteId)).FirstOrDefault());
            }

            // Owner's notes
            foreach (Notes note in oNotes)
            {
                notes.Add(note);
            }

            // Sanitize the notes because we don't need a reference to each author's information going back with each one
            if (notes.Count > 0) 
            {
                foreach (Notes note in notes)
                {
                    var req = new NoteRequest();

                    var author = db.Users.Where(u => u.UserId.Equals(note.UserId)).FirstOrDefault();

                    req.Username = author.Username;
                    req.NoteID = note.NotesId;
                    req.ClassID = note.ClassId;
                    req.Note = note.Note;
                    req.NoteFile = note.NoteFile;
                    req.NoteFileName = note.NoteFileName;
                    req.Extension = note.Extension;
                    req.NoteDate = note.NoteDate;
                    req.UploadDate = note.UploadDate;

                    var totalViewers = db.NoteViewers.Where(n => n.NoteId.Equals(note.NotesId));
                    var listOfViewers = new List<String>();

                    foreach (NoteViewers nv in totalViewers.ToList())
                    {
                        var usr = db.Users.Where(u => u.UserId.Equals(nv.UserId)).FirstOrDefault();
                        Debug.WriteLine(usr.Username);
                        listOfViewers.Add(usr.Username);
                    }

                    req.Users = listOfViewers.ToArray();

                    output.Add(req);
                }
            }

            // Sort notes by most recent, probably
            output.Sort();

            return output;
        }

        public int CompareTo(NoteRequest other)
        {
            return this.UploadDate.CompareTo(other.UploadDate);
        }
    }
}

using Newtonsoft.Json;
using NoteAPI.Scaffolding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace NoteAPI.Classes.Requests
{
    public class NoteRequest : IComparable<NoteRequest>
    {
        public int NoteID { get; set; }
        public string ClassID { get; set; }
        public string Note { get; set; }
        public byte[] NoteFile { get; set; }
        public string NoteFileName { get; set; }
        public string Extension { get; set; }
        public DateTime NoteDate { get; set; }
        public DateTime UploadDate { get; set; }
        public string[] Users { get; set; }

        public string AddNote(CSC425Context db) 
        {
            return "";
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
            foreach (Notes note in notes.ToList<Notes>())
            {
                var req = new NoteRequest();

                req.NoteID = note.NotesId;
                req.ClassID = note.ClassId;
                req.Note = note.Note;
                req.NoteFile = note.NoteFile;
                req.NoteFileName = note.NoteFileName;
                req.Extension = note.Extension;
                req.NoteDate = note.NoteDate;
                req.UploadDate = note.UploadDate;
                req.Users = null;

                output.Add(req);
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

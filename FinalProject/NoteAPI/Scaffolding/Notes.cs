using System;
using System.Collections.Generic;

namespace NoteAPI.Scaffolding
{
    public partial class Notes
    {
        public Notes()
        {
            NoteViewers = new HashSet<NoteViewers>();
        }

        public int NotesId { get; set; }
        public int UserId { get; set; }
        public string Note { get; set; }
        public string ClassId { get; set; }
        public byte[] NoteFile { get; set; }
        public string NoteFileName { get; set; }
        public string Extension { get; set; }
        public DateTime NoteDate { get; set; }
        public DateTime UploadDate { get; set; }

        public virtual Users User { get; set; }
        public virtual ICollection<NoteViewers> NoteViewers { get; set; }
    }
}

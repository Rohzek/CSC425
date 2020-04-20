using System;
using System.Collections.Generic;

namespace NoteAPI.Scaffolding
{
    public partial class NoteViewers
    {
        public int NoteViewerId { get; set; }
        public int NoteId { get; set; }
        public int UserId { get; set; }

        public virtual Notes Note { get; set; }
        public virtual Users User { get; set; }
    }
}

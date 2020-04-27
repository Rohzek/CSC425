/*
 * This class allows us to parse and export the Notes from the API
 */
export class NotesReturn {
    Username: string;
    NoteID: number;
    ClassID: string;
    Note: string;
    NoteFile: string;
    NoteFileName: string;
    Extension: string;
    NoteDate: string;
    UploadDate: string;
    Users: string[];
  
    constructor(username, noteid, classid, note, notefile, notefilename, extension, notedate, uploaddate, users) {
      this.Username = username;
      this.NoteID = noteid;
      this.ClassID = classid;
      this.Note = note;
      this.NoteFile = notefile;
      this.NoteFileName = notefilename;
      this.Extension = extension;
      this.NoteDate = notedate;
      this.UploadDate = uploaddate;
      this.Users = users;
    }
  }
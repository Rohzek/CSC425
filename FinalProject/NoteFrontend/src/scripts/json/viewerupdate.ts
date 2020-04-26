export class ViewerUpdate {
    NoteID: number;
    Username: string;
  
    constructor(noteid, username) {
      this.NoteID = noteid;
      this.Username = username;
    }
  }
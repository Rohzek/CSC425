/*
 * This class is a wrapper for sending and receiving requests to add or remove viewers to the notes 
 */
export class ViewerUpdate {
    NoteID: number;
    Username: string;
  
    constructor(noteid, username) {
      this.NoteID = noteid;
      this.Username = username;
    }
  }
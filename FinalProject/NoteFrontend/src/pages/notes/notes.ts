import { autoinject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ReturnCode} from '../../scripts/json/returncode';
import {NotesReturn} from '../../scripts/json/notesreturn';
import {ViewerUpdate} from '../../scripts/json/viewerupdate';
import {Config} from '../../globals';

@autoinject
export class Notes {
    httpClient: HttpClient;
    APIKEY = "?api_key=6c8s9c5442051f2i6n6a3l";
    isLoggedIn: boolean;
    search: string;
    notes = new Array<NotesReturn>();
    user: string;

    date: string;
    allowedUsers: string = "";
    newAllowUser: string = "";
    newNote = new NotesReturn(Config.Username, "", "", "", "", "", "", new Date(), new Date(), []);

    selectedFiles = [];

    constructor(httpClient: HttpClient) {
        this.isLoggedIn = Config.IsLoggedIn;

        httpClient.configure(config => {
          config
            .withBaseUrl('http://rohzek.cf:8080/api/v1/')
            //.withBaseUrl('http://localhost:8080/api/v1/')
            .withDefaults({
              headers: {
                'Content-Type': 'application/json',
              }});
        });

        this.httpClient = httpClient;
        this.user = Config.Username;
        this.date = this.formatDateBlock(new Date());
    
        this.fetchNotes();
      }

      formatDateBlock(date) { 
        var offset = date.getTimezoneOffset() * 60000;
        var adjustedDate = new Date(date.getTime() - offset);
        var formattedDate = adjustedDate.toISOString().substring(0,16); // For minute precision

        return formattedDate;
      }

      public fetchNotes() {
        this.callAPIGET(Config.Username, '');
      }

      public submitSearch() {
        this.callAPIGET(Config.Username, this.search);
      }

      callAPIGET(username, search) {
        this.httpClient.fetch('notes' + this.APIKEY + '&username=' + username + (search !== null && search.length > 0 ? '&search=' + search : ''), {
            method: 'GET',
          })
          .then(response => response.json())
          .then(data => {
            this.notes = new Array<NotesReturn>();
            for(let entry of data) {
              var note = new NotesReturn(entry.Username, entry.NoteID, entry.ClassID, entry.Note, entry.NoteFile, entry.NoteFileName, entry.Extension, this.formatDateBlock(new Date(entry.NoteDate)), this.formatDateBlock(new Date(entry.UploadDate)), entry.Users);
              this.notes.push(note);
            }
          });
      }

      callAPIPOST() {
        this.httpClient.fetch('notes' + this.APIKEY, {
            method: 'POST',
            body: JSON.stringify(this.newNote),
          })
          .then(response => response.json())
          .then(data => {
            var code = new ReturnCode(data.Code, data.Name, data.Description);
          });

          this.reload();
      }

      callAPIDELETE(NoteID) 
      {
        this.httpClient.fetch('notes' + this.APIKEY + '&noteid=' + NoteID + '&username=' + this.user, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          var code = new ReturnCode(data.Code, data.Name, data.Description);
          console.log(code);
        });

        this.reload();
      }

      callAPIADDUSER(update) {
        this.httpClient.fetch('viewer' + this.APIKEY, {
            method: 'PUT',
            body: JSON.stringify(update),
          })
          .then(response => response.json())
          .then(data => {
            var code = new ReturnCode(data.Code, data.Name, data.Description);
          });

          this.reload();
      }

      callAPIREMOVEUSER(update) {
        this.httpClient.fetch('viewer' + this.APIKEY + '&noteid=' + update.NoteID + '&username=' + update.Username, {
            method: 'DELETE',
          })
          .then(response => response.json())
          .then(data => {
            var code = new ReturnCode(data.Code, data.Name, data.Description);
          });

          this.reload();
      }

      isOwner(username) {
        if(username === this.user) {
          return true;
        }

        return false;
      }
      
      async addNote() {
        if(this.selectedFiles.length == 0) {
          alert("Please choose a file to upload.");
        }
        // Number of b in one mb * number of mbs
        if(this.selectedFiles[0].size > (1000000 * 65)) {
          alert("Please limit your text files to 64mb or less");
        } else {
          if(this.newNote.ClassID == null || this.newNote.ClassID.length == 0) {
            alert("You forgot to specify a class");
          } else {
            var file = this.selectedFiles[0];
            var name = file.name.replace(/\.txt|\.rtf/,'');
            var extension = file.name.match(/\.txt|\.rtf/)[0];
            var text = await file.text().then(value => text = value);

            if(this.allowedUsers.length > 0) {
              var authUsers = this.allowedUsers.split(",")
              this.newNote.Users = authUsers;
            }
              

            this.newNote.Username = this.user;
            this.newNote.NoteID = 0;
            this.newNote.NoteFileName = name;
            this.newNote.Extension = extension;
            this.newNote.Note = text;
            this.newNote.NoteFile = btoa(text);
            this.newNote.NoteDate = this.date;
            
            console.log(JSON.stringify(this.newNote));
            this.callAPIPOST();
          }
        }
      }

      deleteNote(NoteID) {
        console.log("Deleting note with id " + NoteID);
        this.callAPIDELETE(NoteID);
      }

      downloadFile(note) {
        var text = atob(note.NoteFile);
        var name = note.NoteFileName;
        var ext = note.Extension;

        this.download(name + ext, text);
      }

      download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-16,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }

      removeNote(note) {
        console.log("Remove yourself from viewing a note");
        var update = new ViewerUpdate(note, this.user);
        this.callAPIREMOVEUSER(update);
      }

      updateUsers(note, user, operation) {
        if(user.length == 0) {
          alert("You didn't specify a user");
        } else {
          var update = new ViewerUpdate(note, user);

          if (operation === "ADD") {
            this.callAPIADDUSER(update);
          }
          if(operation === "REMOVE") {
            this.callAPIREMOVEUSER(update);
          }
        }
      }

      reload() {
        window.location.reload();
      }
  }
  
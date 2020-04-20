import { autoinject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ReturnCode} from '../../scripts/json/returncode';
import {Config} from '../../globals';

@autoinject
export class Notes {
    httpClient: HttpClient;
    isLoggedIn: boolean;
    search: string;

    constructor(httpClient: HttpClient) {
        this.isLoggedIn = Config.IsLoggedIn;

        httpClient.configure(config => {
          config
            .withBaseUrl('http://rohzek.cf:8080/api/v1/')
            .withDefaults({
              headers: {
                'Content-Type': 'application/json',
              }});
        });

        this.httpClient = httpClient;
    
        this.fetchNotes();
      }

      public fetchNotes() {
        console.log("Fetching notes for user: " + Config.Username);
        this.callAPI(Config.Username, '')
      }

      public submit() {
        console.log("Fetching notes for user: " + Config.Username + " with search term: " + this.search);
        this.callAPI(Config.Username, this.search)
      }

      callAPI(username, search) {
        this.httpClient.fetch('notes?api_key=6c8s9c5442051f2i6n6a3l&username=' + username + (search !== null && search.length > 0 ? '&search=' + search : ''), {
            method: 'GET',
          })
          .then(response => response.json())
          .then(data => {  
              console.log(data);
          });
      }
  }
  
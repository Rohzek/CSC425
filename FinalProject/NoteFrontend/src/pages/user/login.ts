import { autoinject } from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {ReturnCode} from '../../scripts/json/returncode';

@autoinject
export class Login {
  httpClient: HttpClient;
  public heading: string = 'Login';
  public username: string = '';
  public password: string = '';

  constructor(httpClient: HttpClient) {
    httpClient.configure(config => {
      config
        .withBaseUrl('http://rohzek.cf:8080/api/v1/')
        .withDefaults({
          headers: {
            'Content-Type': 'application/json',
          }});
    });
    this.httpClient = httpClient;
  }

  public submit() {
    var user = { UsernameOrEmail: this.username, Password: this.password };
    this.httpClient.fetch('login?api_key=6c8s9c5442051f2i6n6a3l', {
      method: 'POST',
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      var code = new ReturnCode(data.Code, data.Name, data.Description);

      if(code.Code == 200) {
        localStorage.setItem('username', user.UsernameOrEmail);
        localStorage.setItem('sessionID', code.Description);

        // Redirect to home screen
        location.assign('/');
      }
    });
  }
}

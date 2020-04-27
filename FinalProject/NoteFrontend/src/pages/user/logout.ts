export class Logout {
    constructor() {       
        localStorage.setItem('username', "");
        localStorage.setItem('sessionID', "");

        location.assign('/'); // Auto redirects back home
  }
}

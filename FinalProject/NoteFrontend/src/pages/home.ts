import {Config} from '../globals';

export class Home {
  isLoggedIn : boolean;
  username: string;
    constructor() {
        this.isLoggedIn = Config.IsLoggedIn;
        this.username = Config.Username;
    }
}

import { Router, RouterConfiguration, RouteConfig } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {ReturnCode} from './scripts/json/returncode';
import {Config} from './globals';

@autoinject
export class App {
  router: Router;
  httpClient: HttpClient;

  LoggedIn: boolean;

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

    this.attemptLogin();
  }

  public attemptLogin() {
    if(localStorage.getItem('username') === null) {
      localStorage.setItem('username', "");
    }
    if(localStorage.getItem('sessionID') === null) {
      localStorage.setItem('sessionID', "");
    }

    Config.Username = localStorage.getItem('username');
    Config.SessionID = localStorage.getItem('sessionID');

    if(Config.Username.length != 0 && Config.SessionID.length != 0) {
      var user = { UsernameOrEmail: Config.Username, SessionID: Config.SessionID };
      Config.IsLoggedIn = true;
      this.LoggedIn = Config.IsLoggedIn;

      this.httpClient.fetch('login', {
        method: 'POST',
        body: JSON.stringify(user),
      })
      .then(response => response.json())
      .then(data => {
        var code = new ReturnCode(data.Code, data.Name, data.Description);
        if(code.Code != 200) {
          localStorage.setItem('username', "");
          localStorage.setItem('sessionID', "");
          Config.IsLoggedIn = false;
          this.LoggedIn = Config.IsLoggedIn;
          // Route to login page instead maybe
          location.assign('/');
        }
      });
    }
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'rohzek.cf';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: './pages/home',
        nav: true,
        title: 'Home'
      },
      {
        route: 'notes',
        name: 'notes',
        moduleId: './pages/notes/notes',
        nav: true,
        title: 'Notes'
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: './pages/user/signup',
        nav: !Config.IsLoggedIn,
        title: 'Signup'
      },
      {
        route: 'login',
        name: 'login',
        moduleId: './pages/user/login',
        nav: !Config.IsLoggedIn,
        title: 'Login'
      },
      {
        route: 'settings',
        name: 'settings',
        moduleId: './pages/user/settings',
        nav: Config.IsLoggedIn,
        title: 'Settings'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: './pages/user/logout',
        nav: Config.IsLoggedIn,
        title: 'Logout'
      },
    ]);

    // Enable removal of # from URL
    config.options.pushState = true;
    config.options.hashChange = false;
    config.options.root = '/';
    // For navigating to unknown pages
    config.fallbackRoute('home');
    config.mapUnknownRoutes('home');

    this.router = router;
  }
}

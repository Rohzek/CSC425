import {Router, RouterConfiguration} from 'aurelia-router';

export class ChildRouter {
  public heading = 'Child Router';
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: './pages/default/welcome',
        nav: true,
        title: 'Welcome'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: './pages/default/users',
        nav: true,
        title: 'Github Users'
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: './pages/default/child-router',
        nav: true,
        title: 'Child Router'
      }
    ]);

    this.router = router;
  }
}

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Auth} from 'auth';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Akka Chat';
      config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
      config.map([
        {route: ['', 'welcome'], moduleId: './welcome', nav: true, title: 'Welcome'},
        {route: 'chat', moduleId: './chat', nav: false, auth: true}
      ]);
    });
  }
}

@inject(Auth)
class AuthorizeStep {
  constructor(auth) {
    this.auth = auth;
  }

  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      var isLoggedIn = this.auth.isLoggedIn();
      if (!isLoggedIn) {
        console.log('not authorized, redirecting');
        return next.cancel(new Redirect('welcome'));
      }
    }

    return next();
  }
}

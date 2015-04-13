import {ChatService} from 'chatservice'
import {Router} from 'aurelia-router'
import {Auth} from 'auth'

export class Welcome {
  static inject() {
    return [ChatService, Router, Auth];
  }

  constructor(chatService, router, auth) {
    this.heading = 'Welcome to Akka-Chat';
    this.firstName = 'Chuck';
    this.lastName = 'Norris';
    this.chatService = chatService;
    this.myRouter = router;
    this.auth = auth;
  }

  get fullName() {
    return `${this.firstName}${this.lastName}`;
  }

  login() {
    //alert(`Welcome, ${this.fullName}!`);
    let res = this.chatService.join(this.fullName);
    res.then(
        success => {
        console.log(success);
        this.auth.login(this.fullName);
        this.myRouter.navigate('chat');
      },

        error => {
        console.log(err);
        alert('Join failed.');
      }
    );

  }
}

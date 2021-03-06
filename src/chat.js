import {ChatService} from 'chatservice'
import {Auth} from 'auth'

export class Chat {
  static inject() {
    return [ChatService, Auth];
  }

  constructor(chatService, auth) {
    this.chatService = chatService;
    this.auth = auth;
    this.userInput = '';
    this.messages = [];

    this.evtSource = this.initEventSource();
  }

  initEventSource() {
    console.log('initevtsource');
    var evtSource = new EventSource("/sse/");
    evtSource.onerror = function (e) {
      console.log('error', e);
    };

    evtSource.addEventListener('contribution', sse => {
      console.log('contribution', sse);
      let data = JSON.parse(sse.data);
      this.messages.push(data);
      //let message = `${data.name}: ${data.msg}`;
      //Chat.addChatMessage(message);
    });

    evtSource.addEventListener('join', sse => {
      console.log('join', sse);
      let data = JSON.parse(sse.data);
      let message = {msg: `${data.name} joined the chat.`};
      this.messages.push(message);
      //Chat.addChatMessage(message);
    });

    return evtSource;
  }

  send() {
    let res = this.chatService.contribute(this.auth.userName, this.userInput);
    res.then(success => {
      console.log(success);
      this.userInput = '';
    });
  }

  deactivate() {
    console.log('closing evt source');
    this.evtSource.close();
  }

/*
  static addChatMessage(content) {
    //TODO proper templating
    var div = document.createElement('div');
    div.innerHTML = content;
    var container = document.querySelector('.chat-content');
    container.appendChild(div);
  }
*/
}

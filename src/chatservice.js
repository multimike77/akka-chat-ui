import {HttpClient} from 'aurelia-http-client';

export class ChatService {
    static inject() {
        return [HttpClient];
    }

    constructor(http) {
        this.http = http;
    }

    join(userName) {
        return this.http.get('/api/join/' + encodeURIComponent(userName));
    }

    contribute(user, message) {
        let url = '/api/contrib/' + encodeURIComponent(user);
        return this.http.post(url, message);
    }

    leave(user) {
        return this.http.get('/api/leave/' + encodeURIComponent(user));
    }
}

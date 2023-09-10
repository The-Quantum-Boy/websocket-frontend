import { Component } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  greeting: any;
  name: any;
  constructor(private ws: WebSocketService) {

  }

  ngOnInit() {
  }

  connect() {
    this.ws._connect();
    console.log("connected");

  }

  disconnect() {
    this.ws._disconnect();
  }

  sendMessage() {
    this.ws._send(this.name);
  }

  // handleMessage(message: any) {
  //   this.greeting = this.ws.onMessageReceived(message);
  //   console.log(this.greeting);

  // }
  getMessage() {
    this.greeting = this.ws.onMessageReceived();
  }

}

import { Injectable } from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from "rxjs";
import { AnonymousSubject } from "rxjs/internal/Subject";


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private subject!: AnonymousSubject<MessageEvent>;
  public messages!: Subject<string>;


  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/greetings";
  stompClient: any;
  message: any;
  constructor() {
  }
  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      console.log("connected", frame);

      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        console.log(sdkEvent);
        _this.message = sdkEvent;
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived() {
    console.log("Message Recieved from Server :: " + this.message);
    return JSON.stringify(this.message.body);
  }
}

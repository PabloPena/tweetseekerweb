import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import TweetNotificationData from 'src/app/tweets/models/tweet-notifiaction-data.interface';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  broadcastId: string;
  socket: SocketIOClient.Socket;
  private messageQueue$: BehaviorSubject<TweetNotificationData[]> = new BehaviorSubject([]);
  constructor() {
    this.broadcastId = generateBroadcastId();
  }

  setupSocketConnection() {
    this.socket = io.connect(environment.SOCKET_ENDPOINT);

    // Listen the broadcastId event and push stack
    this.socket.on(this.broadcastId, data => {
      this.messageQueue$.next([...this.messageQueue$.value, data]);
    })
  }

  getBroadcastId() {
    return this.broadcastId;
  }

  shiftMessage() {
    const firstElement = this.messageQueue$.value.shift();
    this.messageQueue$.next([...this.messageQueue$.value.slice(1)]);
    return firstElement;
  }

  getMessageQueue(): BehaviorSubject<TweetNotificationData[]> {
    return this.messageQueue$;
  }
}


const generateBroadcastId = (): string => Math.floor((Math.random() * 10000) + 1).toString();
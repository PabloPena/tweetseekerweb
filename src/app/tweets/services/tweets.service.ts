import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from 'src/app/shared/services/socket.service';
import { environment } from '../../../environments/environment';
import * as fromRoot from '../../reducers';
import { TweetsActions } from '../actions';
import { TweetFilter } from '../models/tweet-filter.model';
import TweetNotificationData from '../models/tweet-notifiaction-data.interface';
import { TweetNotificationAction } from '../models/tweet-notification-action.enum';
import { TweetPageRequest } from '../models/tweet-page-request';
import { NotificationActions } from 'src/app/core/actions';
import { NotificationType, Notification } from 'src/app/core/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {

  constructor(
    private http: HttpClient, private socketService: SocketService, private store: Store<fromRoot.State>,) {
        // Subscribe to tweet streaming notifications retrieved from API. For each change, shift and process;
        this.socketService.getMessageQueue().subscribe((queue: TweetNotificationData[]) => {
            if (queue && queue.length > 0) {
                const newTweetNotification: TweetNotificationData = socketService.shiftMessage();
                if (newTweetNotification.action === TweetNotificationAction.TWEET_RECEIVED) {
                  this.store.dispatch(new TweetsActions.QueueNewStreamedTweet(newTweetNotification.data));
                } else {
                  // Obviate error in streaming
                  /* let notification = new Notification(null, 'An unexpected error has ocurred', NotificationType.ERROR, 2000);
                  this.store.dispatch(new NotificationActions.OpenNotification(notification)); */
                }
            }
        })
  }

  getUserTweets(filter: TweetFilter, pagination: TweetPageRequest){
    const body = JSON.stringify({filter, pagination, broadcastId: this.socketService.getBroadcastId()});
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}/tweet/user/tweets`, body, {
      headers: this.getHeaders()
    });
  }

  searchRecentTweets(filter: TweetFilter, pagination: TweetPageRequest){
    const body = JSON.stringify({filter, pagination, broadcastId: this.socketService.getBroadcastId()});
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}/tweet/search`, body, {
      headers: this.getHeaders()
    });
  }

  streamTweets(filter: TweetFilter){
    const body = JSON.stringify({filter, broadcastId: this.socketService.getBroadcastId()});
    return this.http.post(`${environment.apiBaseUrl}${environment.apiPath}/tweet/listen`, body, {
      headers: this.getHeaders()
    });
  }

  private getHeaders() {
    let headers = {};
    headers['Content-Type'] = 'application/json';

    return new HttpHeaders(headers)
  }

}

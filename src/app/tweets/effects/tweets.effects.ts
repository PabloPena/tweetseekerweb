import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
} from 'rxjs/operators';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../reducers';
import { NotificationActions } from 'src/app/core/actions';
import { NotificationType, Notification } from 'src/app/core/models/notification.model';
import { TweetsActions } from '../actions';;
import { TweetPageResponseCollection } from '../models/tweet-page-response-collection';
import { TweetsService } from '../services/tweets.service';
import { Tweet } from '../models/tweet.model';


@Injectable()
export class TweetsEffects {

    constructor(
        private store: Store<fromRoot.State>,
        private actions$: Actions,
        private tweetService: TweetsService
    ) { }

    @Effect()
    getUserTweets$ =
    this.actions$.pipe(
        ofType<TweetsActions.GetUserTweets>(
            TweetsActions.TweetsActionTypes.GetUserTweets
        ),
        map(action => action.payload),
        switchMap(payload => {
            return this.tweetService.getUserTweets(payload.filter, payload.pagination).pipe(
                map((apiResponse: TweetPageResponseCollection) => {
                        return new TweetsActions.GetUserTweetsSuccess(apiResponse)
                    }
                ),
                catchError(err => { 
                    let notification = new Notification(null, 'An unexpected error has ocurred loading timeline', NotificationType.ERROR, 2000);
                    this.store.dispatch(new NotificationActions.OpenNotification(notification));
                    return of(new TweetsActions.GetUserTweetsFailure(err))
                })
            )
        })
    );

    @Effect()
    searchRecentTweets$ =
    this.actions$.pipe(
        ofType<TweetsActions.SearchRecentTweets>(
            TweetsActions.TweetsActionTypes.SearchRecentTweets
        ),
        map(action => action.payload),
        switchMap(payload => {
            return this.tweetService.searchRecentTweets(payload.filter, payload.pagination).pipe(
                map((apiResponse: TweetPageResponseCollection) => {
                        // Listen for more tweets in live mode
                        this.store.dispatch(new TweetsActions.ListenFilteredTweets(payload.filter));
                        return new TweetsActions.SearchRecentTweetsSuccess(apiResponse)
                    }
                ),
                catchError(err => { 
                    let notification = new Notification(null, 'An unexpected error has ocurred searching tweets', NotificationType.ERROR, 2000);
                    this.store.dispatch(new NotificationActions.OpenNotification(notification));
                    return of(new TweetsActions.GetUserTweetsFailure(err))
                })
            )
        })
    );

    @Effect()
    listenFilteredTweets$ =
    this.actions$.pipe(
        ofType<TweetsActions.ListenFilteredTweets>(
            TweetsActions.TweetsActionTypes.ListenFilteredTweets
        ),
        map(action => action.payload),
        switchMap(payload => {
            return this.tweetService.streamTweets(payload).pipe(
                map(_ => {
                    let notification = new Notification(null, 'App is streaming tweets ...', NotificationType.SUCCESS, 2000);
                    return new NotificationActions.OpenNotification(notification);
                }),
                catchError(err => { 
                    let notification = new Notification(null, 'An unexpected error has ocurred in streaming setup', NotificationType.ERROR, 2000);
                    this.store.dispatch(new NotificationActions.OpenNotification(notification));
                    return of(new TweetsActions.GetUserTweetsFailure(err))
                })
            )
        })
    );
}
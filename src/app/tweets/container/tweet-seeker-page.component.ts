import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import * as fromRoot from '../../reducers';
import { TweetsActions } from "../actions";
import { TweetFilter } from "../models/tweet-filter.model";
import { TweetPageRequest } from "../models/tweet-page-request";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tweet-seeker-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'tweet-seeker-page.component.html'
})

export class TweekSeekerPageComponent {
  mode: 'timeline' | 'tweets' = 'timeline'; 
  username: string;
  keyword: string;
  hashtag: string;
  excludeRetweets: boolean;
  excludeReplies: boolean;

  currentFilter$: BehaviorSubject<TweetFilter> = new BehaviorSubject(null);
  mode$: BehaviorSubject<string> = new BehaviorSubject('timeline');

  constructor(private store: Store<fromRoot.State>) {

  }

  processRequest() {
    this.mode$.next(this.mode);
    if (this.mode == 'timeline'){
      const filter: TweetFilter = {
        username: this.username.startsWith('@') ? this.username.substring(1) : this.username,
        excludeReplies: this.excludeReplies,
        excludeRetweets: this.excludeRetweets
      }
      const pagination: TweetPageRequest = {
        numResults: environment.maxResultsByRequest
      }
      this.currentFilter$.next(filter);
      this.store.dispatch(new TweetsActions.GetUserTweets({filter, pagination}));
    } else {
      const filter: TweetFilter = {
        keywords: this.keyword ? [this.keyword] : [],
        excludeReplies: !!this.excludeReplies,
        excludeRetweets: !!this.excludeRetweets
      }
      const pagination: TweetPageRequest = {
        numResults: environment.maxResultsByRequest
      }
      if (this.hashtag) filter.hashtag = this.hashtag.startsWith('#') ? this.hashtag.substring(1) : this.hashtag;
      this.currentFilter$.next(filter);
      this.store.dispatch(new TweetsActions.SearchRecentTweets({filter, pagination}));
    }
  }

  requestIsValid() {
    if (this.mode == 'timeline'){
      return !!this.username;
    } else {
      return !!this.keyword || !!this.hashtag;
    }
  }

}
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromRoot from '../../../reducers';
import { BehaviorSubject, Observable } from "rxjs";
import { TweetPageRequest } from "../../models/tweet-page-request";
import { Tweet } from "../../models/tweet.model";
import { TweetFilter } from "../../models/tweet-filter.model";
import { TweetsActions } from "../../actions";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tweet-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'tweet-list.component.html'
})

export class TweetListComponent {
  @Input() mode: 'timeline' | 'tweets'; 
  @Input() currentFilter: TweetFilter;

  tweets$: Observable<Tweet[]>;
  queueLength$: Observable<number>;
  nextPageRequest$: Observable<TweetPageRequest>;
  nextPageRequestToken$: BehaviorSubject<string> = new BehaviorSubject(null);
  loadingNextPage$: Observable<boolean>;
  nextPageRequestSubscription;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.tweets$ = this.store.pipe(select(fromRoot.getCurrentTweets));
    this.queueLength$ = this.store.pipe(select(fromRoot.getNumberOfTweetsQueued));
    this.nextPageRequest$ = this.store.pipe(select(fromRoot.getNextPageRequest));
    this.nextPageRequestSubscription = this.nextPageRequest$.subscribe(nextPageRequest => {
      this.nextPageRequestToken$.next(nextPageRequest?.requestedPageToken);
    })
    this.loadingNextPage$ = this.store.pipe(select(fromRoot.getLoadingNextPage));
  }

  ngOnDestroy() {
    if (this.nextPageRequestSubscription) this.nextPageRequestSubscription.unsubscribe();
  }

  processNextPage(){
    if (this.mode === 'timeline'){
      this.store.dispatch(new TweetsActions.GetUserTweets({
        filter: this.currentFilter, 
        pagination: {
          numResults: environment.maxResultsByRequest,
          requestedPageToken: this.nextPageRequestToken$.value
        }
      }));
    } else {
      this.store.dispatch(new TweetsActions.SearchRecentTweets({
        filter: this.currentFilter, 
        pagination: {
          numResults: environment.maxResultsByRequest,
          requestedPageToken: this.nextPageRequestToken$.value
        }
      }));
    }
  }

  releaseQueue(){
    this.store.dispatch(new TweetsActions.DisplayStreamedTweets());
  }

}
import { Action } from '@ngrx/store';
import { ApiError } from 'src/app/shared/models/base/api-error';
import { ApiReponseCollection } from 'src/app/shared/models/base/api-response-collection.model';
import { TweetFilter } from '../models/tweet-filter.model';
import { TweetPageRequest } from '../models/tweet-page-request';
import { TweetPageResponseCollection } from '../models/tweet-page-response-collection';
import { Tweet } from '../models/tweet.model';

export enum TweetsActionTypes {
  GetUserTweets = '[Tweets] GetUserTweets',
  GetUserTweetsSuccess = '[Tweets] GetUserTweets Success',
  GetUserTweetsFailure = '[Tweets] GetUserTweets Failure',
  SearchRecentTweets = '[Tweets] SearchRecentTweets',
  SearchRecentTweetsSuccess = '[Tweets] SearchRecentTweets Success',
  SearchRecentTweetsFailure = '[Tweets] SearchRecentTweets Failure',
  ListenFilteredTweets = '[Tweets] ListenFilteredTweets',
  QueueNewStreamedTweet = '[Tweets] QueueNewStremedTweet',
  DisplayStreamedTweets = '[Tweets] DisplayStreamedTweets'
}

export class GetUserTweets implements Action {
  readonly type = TweetsActionTypes.GetUserTweets;
  constructor(public payload: {
    filter: TweetFilter,
    pagination: TweetPageRequest,
  }) {}
}

export class GetUserTweetsSuccess implements Action {
  readonly type = TweetsActionTypes.GetUserTweetsSuccess;
  constructor(public payload: TweetPageResponseCollection) {}
}

export class GetUserTweetsFailure implements Action {
  readonly type = TweetsActionTypes.GetUserTweetsFailure;
  constructor(public payload: ApiError) {}
}

export class SearchRecentTweets implements Action {
  readonly type = TweetsActionTypes.SearchRecentTweets;
  constructor(public payload: {
    filter: TweetFilter,
    pagination: TweetPageRequest,
  }) {}
}

export class SearchRecentTweetsSuccess implements Action {
  readonly type = TweetsActionTypes.SearchRecentTweetsSuccess;
  constructor(public payload: TweetPageResponseCollection) {}
}

export class SearchRecentTweetsFailure implements Action {
  readonly type = TweetsActionTypes.SearchRecentTweetsFailure;
  constructor(public payload: ApiError) {}
}

export class ListenFilteredTweets implements Action {
  readonly type = TweetsActionTypes.ListenFilteredTweets;
  constructor(public payload: TweetFilter) {}
}

export class QueueNewStreamedTweet implements Action {
  readonly type = TweetsActionTypes.QueueNewStreamedTweet;
  constructor(public payload: Tweet) {}
}

export class DisplayStreamedTweets implements Action {
  readonly type = TweetsActionTypes.DisplayStreamedTweets;
  constructor() {}
}

export type TweetsActionsUnion = 
  GetUserTweets | GetUserTweetsSuccess | GetUserTweetsFailure |
  SearchRecentTweets | SearchRecentTweetsSuccess | SearchRecentTweetsFailure | 
  ListenFilteredTweets | QueueNewStreamedTweet | DisplayStreamedTweets;

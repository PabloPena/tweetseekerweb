import {
  TweetsActions
} from '../actions';
import { TweetPageResponseCollection } from '../models/tweet-page-response-collection';
import { Tweet } from '../models/tweet.model';

export interface State {
  tweets: Tweet[],
  queue: Tweet[],
  lastPage: TweetPageResponseCollection,
  loadingNextPage: boolean
}

const initialState: State = {
  tweets: [],
  queue: [],
  lastPage: undefined,
  loadingNextPage: false
};

export function reducer(
  state: State = initialState,
  action: TweetsActions.TweetsActionsUnion
): State {
  let clonedTweets;
  switch (action.type) {
    case TweetsActions.TweetsActionTypes.GetUserTweets:
    case TweetsActions.TweetsActionTypes.SearchRecentTweets:
      const newInitial = Object.assign({}, initialState);
      return {
        ...newInitial,
        loadingNextPage: action.payload.pagination?.requestedPageToken ? true : false,
        tweets: action.payload.pagination?.requestedPageToken ? state.tweets : []
      }
    case TweetsActions.TweetsActionTypes.GetUserTweetsSuccess:
    case TweetsActions.TweetsActionTypes.SearchRecentTweetsSuccess:
      clonedTweets = JSON.parse(JSON.stringify(state.tweets));
      clonedTweets.push(...action.payload.data)
      return {
        ...state,
        tweets: clonedTweets,
        lastPage: action.payload,
        loadingNextPage: false
      };
    case TweetsActions.TweetsActionTypes.GetUserTweetsFailure:
    case TweetsActions.TweetsActionTypes.SearchRecentTweetsFailure:
      return {
        ...state,
        loadingNextPage: false
      };
    case TweetsActions.TweetsActionTypes.QueueNewStreamedTweet:
      const clonedQueue = JSON.parse(JSON.stringify(state.queue));
      if (action.payload.username) clonedQueue.push(action.payload);
      return {
        ...state,
        queue: clonedQueue,
      };
    case TweetsActions.TweetsActionTypes.DisplayStreamedTweets:
      return {
        ...state,
        tweets: [...state.queue, ...state.tweets],
        queue: []
      };  
    default:
      return state;
  }
}

export const getCurrentTweets = (state: State) => state.tweets;
export const getNumberOfTweetsQueued = (state: State) => state.queue.length; 
export const getNextPageRequest = (state: State) => state.lastPage?.nextPageToken ? { requestedPageToken: state.lastPage?.nextPageToken, numResults: state.lastPage?.numResults } : null; 
export const getLoadingNextPage = (state: State) => state.loadingNextPage; 
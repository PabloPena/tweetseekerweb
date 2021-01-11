import { ActionReducerMap, createFeatureSelector, createSelector, } from '@ngrx/store';;
import * as fromRouter from '@ngrx/router-store';
import * as fromNotifications from '../core/reducers/notification.reducer';
import * as fromTweets from '../tweets/reducers/tweet.reducer';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  router: fromRouter.RouterReducerState;
  notification: fromNotifications.State;
  tweets: fromTweets.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  notification: fromNotifications.reducer,
  tweets: fromTweets.reducer
};

/**
 * Notification Reducers
 */
export const getNotificationState = createFeatureSelector<State, fromNotifications.State>(
  'notification'
);

export const getNotification = createSelector(
  getNotificationState,
  fromNotifications.getNotification
);

/**
 * Tweets Reducers
 */
export const getTweetsState = createFeatureSelector<State, fromTweets.State>(
  'tweets'
);

export const getCurrentTweets = createSelector(
  getTweetsState,
  fromTweets.getCurrentTweets
);

export const getNumberOfTweetsQueued = createSelector(
  getTweetsState,
  fromTweets.getNumberOfTweetsQueued
);

export const getNextPageRequest = createSelector(
  getTweetsState,
  fromTweets.getNextPageRequest
);

export const getLoadingNextPage = createSelector(
  getTweetsState,
  fromTweets.getLoadingNextPage
);

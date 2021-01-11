import {
  NotificationActions
} from '../actions';

import { Notification } from '../models/notification.model';

export interface State {
  notification: Notification;
  loadingOperations: boolean;
}

const initialState: State = {
  notification: undefined,
  loadingOperations: false
};

export function reducer(
  state: State = initialState,
  action: NotificationActions.NotificationActionsUnion
): State {
  switch (action.type) {
    case NotificationActions.NotificationActionTypes.OpenNotification:
      return {
        ...state,
        notification: action.payload,
      };
      case NotificationActions.NotificationActionTypes.CloseNotification:
      return {
        ...state,
        notification: undefined
      };      
    default:
      return state;
  }
}

export const isLoadingOperations = (state: State) => state.loadingOperations;
export const getNotification = (state: State) => state.notification;

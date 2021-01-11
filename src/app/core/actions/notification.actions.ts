import { Action } from '@ngrx/store';
import { Notification } from '../models/notification.model';

export enum NotificationActionTypes {
  OpenNotification = '[Notification] Open',
  CloseNotification = '[Notification] Close'
}

export class OpenNotification implements Action {
  readonly type = NotificationActionTypes.OpenNotification;
  constructor(public payload: Notification) {}
}

export class CloseNotification implements Action {
  readonly type = NotificationActionTypes.CloseNotification;
  constructor() {}
}

export type NotificationActionsUnion = OpenNotification | CloseNotification;
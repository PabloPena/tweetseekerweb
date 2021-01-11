import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { Notification, NotificationType } from '../../models/notification.model';

@Component({
  selector: 'app-snack-bar',
  templateUrl: 'snackbar.component.html'
})
export class SnackBarComponent {

  @ViewChild('template') template: TemplateRef<any>;

  @Input()
  set notification(notification: Notification) {
    if (notification) {
      this._notification = notification;
/*       this.notificationClass = this.getNotificationClass(); */
      this.openNotification();
    }
  }

  _notification: Notification;
  notificationClass: string;

  constructor(
    public _snackBar: MatSnackBar) {
  }

  openNotification() {
    this._snackBar.open(this._notification.title || this._notification.description, this.getActionMessage(), {
        duration: this._notification.hideAfterMiliseconds,
        panelClass: this.getPanelClass(), 
    });
    
  }

  closeNotification() {
    this._snackBar.dismiss();
  }

  private getActionMessage() {
    let actionMessage = '';
    switch (this._notification.type) {
      case NotificationType.WARNING:
        actionMessage = 'WARNING';
        break;

      case NotificationType.ERROR:
        actionMessage = 'ERROR';
        break;

      case NotificationType.SUCCESS:
        actionMessage = 'SUCCESS';
        break;
    }
    return actionMessage;
  }

  private getPanelClass() {
    let panelClass = '';
    switch (this._notification.type) {
      case NotificationType.WARNING:
        panelClass = 'warningNotification';
        break;

      case NotificationType.ERROR:
        panelClass = 'errorNotification';
        break;

      case NotificationType.SUCCESS:
        panelClass = 'successNotification';
        break;
    }
    return panelClass;
  }
}
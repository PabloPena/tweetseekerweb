
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/shared/services/socket.service';
import * as fromRoot from '../../../reducers';
import { NotificationActions } from '../../actions';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'web-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public data: any;
  notification$: Observable<Notification>;
  
  constructor(private store: Store<fromRoot.State>, private socketService: SocketService) {
    this.notification$ = store.select(fromRoot.getNotification);
  }

  ngOnInit(): void { 
    this.socketService.setupSocketConnection();
  }

  closeNotification() {
    this.store.dispatch(new NotificationActions.CloseNotification());
  }

}

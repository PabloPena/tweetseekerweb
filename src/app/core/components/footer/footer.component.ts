import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html'
})
export class FooterComponent {
  title: string = environment.appName;
  appVersion: string;

  constructor() {
    if (environment.version) {
      this.appVersion = `(v${environment.version})`;
    }
  }

}

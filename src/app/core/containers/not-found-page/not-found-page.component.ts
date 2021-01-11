import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'web-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'not-found-page.component.html'
})
export class NotFoundPageComponent {
}

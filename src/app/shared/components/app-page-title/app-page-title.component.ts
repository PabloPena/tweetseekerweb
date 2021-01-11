import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: 'app-page-title.component.html'
})
export class AppPageTitleComponent {

  @Input()
  icon: string;

  @Input()
  header: string;

  @Input()
  description: string;

}

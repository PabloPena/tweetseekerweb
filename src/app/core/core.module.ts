import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './containers/app/app.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';;
import { SnackBarComponent } from './components/notification/snackbar.component';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  FooterComponent,
  SnackBarComponent
];

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forFeature([]),
  ],
  entryComponents: [],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
}

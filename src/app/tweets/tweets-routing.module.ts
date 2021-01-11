import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TweekSeekerPageComponent } from './container/tweet-seeker-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TweekSeekerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TweetsRoutingModule { }

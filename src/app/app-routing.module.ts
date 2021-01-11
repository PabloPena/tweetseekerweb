import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./tweets/tweets.module').then(m => m.TweetsModule) },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { TweetsRoutingModule } from './tweets-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { TweetsEffects } from './effects/tweets.effects';
import { TweekSeekerPageComponent } from './container/tweet-seeker-page.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { TweetComponent } from './components/tweet/tweet.component';

export const COMPONENTS = [
  TweekSeekerPageComponent,
  TweetListComponent,
  TweetComponent
];

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forFeature([TweetsEffects]),
    TweetsRoutingModule,
  ],
  entryComponents: [],
  declarations: COMPONENTS
})
export class TweetsModule { }

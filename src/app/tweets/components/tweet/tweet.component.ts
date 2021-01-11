import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Tweet } from "../../models/tweet.model";

@Component({
  selector: 'app-tweet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'tweet.component.html'
})

export class TweetComponent {
  @Input() tweet: Tweet;

  constructor() {
  }

  formatDate(dateStr){
    const dateFormatOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const datetimeFormatOpts = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC'};
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-GB', dateFormatOpts)} at ${date.toLocaleTimeString('en-GB', datetimeFormatOpts)}`;
  }

}
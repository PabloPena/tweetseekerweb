// Tweet Filter Model Class Definition
export class TweetFilter {
  
  constructor (
      public username?: string,
      public keywords?: string[],
      public hashtag?: string,
      public excludeRetweets?: boolean,
      public excludeReplies?: boolean,
      public startDate?: string,
      public endDate?: string
    ) {
  }

}
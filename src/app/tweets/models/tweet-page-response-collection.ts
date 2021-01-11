import { ApiReponseCollection } from "../../shared/models/base/api-response-collection.model";

export interface TweetPageResponseCollection extends ApiReponseCollection {
    nextPageToken: string
}
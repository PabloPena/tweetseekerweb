import { TweetNotificationAction } from "./tweet-notification-action.enum";

// Notification Data Model Interface Definition
export default interface TweetNotificationData {
    action: TweetNotificationAction,
    data?: any,
    errors?: any
}
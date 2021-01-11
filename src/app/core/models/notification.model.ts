export const enum NotificationType {
  SUCCESS = 1,
  ERROR = 2,
  INFO = 3,
  WARNING = 4
}
export class Notification {
  type: NotificationType;
  title: string;
  description: string;
  hideAfterMiliseconds: number;
  code: string;

  constructor(title: string, description: string, type: NotificationType, hideAfterMiliseconds?: number, code?: string) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.hideAfterMiliseconds = hideAfterMiliseconds | 0;
    this.code = code;
  }
}

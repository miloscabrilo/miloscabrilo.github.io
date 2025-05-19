import { FeedbackType } from '../enums/feedback-type.enum';

export interface Feedback {
  type: FeedbackType;
  name: string;
  text: string;
}

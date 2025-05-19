import { FeedbackType } from '../enums/feedback-type.enum';
import { Feedback } from '../interfaces/feedback.interface';

export const FEEDBACK_LIST: Feedback[] = [
  {
    type: FeedbackType.PERSON,
    name: 'FEEDBACK1.NAME',
    text: 'FEEDBACK1.TEXT',
  },
  {
    type: FeedbackType.ORGANIZATION,
    name: 'FEEDBACK2.NAME',
    text: 'FEEDBACK2.TEXT',
  },
  {
    type: FeedbackType.ANONYMOUS,
    name: 'FEEDBACK3.NAME',
    text: 'FEEDBACK3.TEXT',
  },
];

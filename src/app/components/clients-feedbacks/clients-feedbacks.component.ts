import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Feedback } from '../../core/interfaces/feedback.interface';
import { FeedbackType } from '../../core/enums/feedback-type.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clients-feedbacks',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './clients-feedbacks.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './clients-feedbacks.component.scss',
})
export class ClientsFeedbacksComponent {
  @Input() public feedbacks: Feedback[] = [];

  public getFeedbackAvatar(feedbackType: FeedbackType): string {
    switch (feedbackType) {
      case FeedbackType.PERSON:
        return 'assets/icons/light/person-24x24.svg';
      case FeedbackType.ORGANIZATION:
        return 'assets/icons/light/organization-24x24.svg';
      case FeedbackType.ANONYMOUS:
      default:
        return 'assets/icons/light/anonymous-24x24.svg';
    }
  }
}

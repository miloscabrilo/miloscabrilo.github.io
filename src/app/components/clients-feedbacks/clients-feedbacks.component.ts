import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input } from '@angular/core';
import { Feedback } from '../../core/interfaces/feedback.interface';
import { FeedbackType } from '../../core/enums/feedback-type.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { Theme } from '../../core/enums/theme.enum';

@Component({
  selector: 'clients-feedbacks',
  imports: [TranslatePipe],
  templateUrl: './clients-feedbacks.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './clients-feedbacks.component.scss',
  standalone: true,
})
export class ClientsFeedbacksComponent {
  private readonly themeService = inject(ThemeService);

  readonly feedbacks = input<Feedback[]>([]);

  getFeedbackAvatar(feedbackType: FeedbackType): string {
    switch (feedbackType) {
      case FeedbackType.PERSON:
        return this.themeService.getThemedIconPath('person-24x24.svg');
      case FeedbackType.ORGANIZATION:
        return this.themeService.getThemedIconPath('organization-24x24.svg');
      case FeedbackType.ANONYMOUS:
      default:
        return this.themeService.getThemedIconPath('anonymous-24x24.svg');
    }
  }

  getTheme(): string {
    return this.themeService.iconFolder();
  }
}

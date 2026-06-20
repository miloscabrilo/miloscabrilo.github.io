import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  signal,
} from '@angular/core';
import { Feedback } from '../../core/interfaces/feedback.interface';
import { FeedbackType } from '../../core/enums/feedback-type.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';

const DESKTOP_BREAKPOINT = 900;

@Component({
  selector: 'clients-feedbacks',
  imports: [TranslatePipe],
  templateUrl: './clients-feedbacks.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './clients-feedbacks.component.scss',
  standalone: true,
  host: {
    '(window:resize)': 'updateLayout()',
  },
})
export class ClientsFeedbacksComponent {
  private readonly themeService = inject(ThemeService);

  readonly feedbacks = input<Feedback[]>([]);
  readonly isDesktop = signal(this.computeIsDesktop());

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

  protected updateLayout(): void {
    this.isDesktop.set(this.computeIsDesktop());
  }

  private computeIsDesktop(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.innerWidth >= DESKTOP_BREAKPOINT
    );
  }
}

import { Component, inject, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { Theme } from '../../core/enums/theme.enum';

@Component({
  selector: 'accordion-item',
  imports: [TranslatePipe],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
})
export class AccordionItemComponent {
  readonly themeService = inject(ThemeService);
  readonly imageUrl = input<string>('');
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly isExpanded = signal(false);

  toggle(): void {
    this.isExpanded.update(v => !v);
  }

  getArrowIcon(): string {
    switch (this.themeService.currentTheme()) {
      case Theme.DARK:
        return 'assets/icons/dark/arrow-down-24x24.svg';
      case Theme.LIGHT:
      default:
        return 'assets/icons/light/arrow-down-24x24.svg';
    }
  }

  isDarkTheme(): boolean {
    return this.themeService.currentTheme() === Theme.DARK;
  }
}

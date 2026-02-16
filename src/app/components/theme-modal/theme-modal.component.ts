import { Component, inject, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Theme } from '../../core/enums/theme.enum';
import { THEME_LIST } from '../../core/constants/theme-list.constants';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'theme-modal',
  imports: [TranslatePipe],
  templateUrl: './theme-modal.component.html',
  styleUrl: './theme-modal.component.scss',
})
export class ThemeModalComponent {
  readonly themeService = inject(ThemeService);

  readonly isVisible = input<boolean>(false);
  readonly selectedTheme = input<Theme>(Theme.LIGHT);
  readonly close = output<void>();
  readonly themes = THEME_LIST;

  async selectTheme(theme: Theme): Promise<void> {
    console.info('App theme is', theme);
    await this.themeService.setTheme(theme);
    this.close.emit();
  }

  closeModal(): void {
    this.close.emit();
  }

  getThemeIcon(theme: Theme): string {
    switch (theme) {
      case Theme.DARK:
        return 'assets/icons/' + this.themeService.iconFolder() + '/dark-mode-24x24.svg';
      case Theme.LIGHT:
      default:
        return 'assets/icons/light/light-mode-24x24.svg';
    }
  }

  getThemeName(theme: Theme): string {
    switch (theme) {
      case Theme.DARK:
        return 'THEME.DARK';
      case Theme.LIGHT:
      default:
        return 'THEME.LIGHT';
    }
  }
}

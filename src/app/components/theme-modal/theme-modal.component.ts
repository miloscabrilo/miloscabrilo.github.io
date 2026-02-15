import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Theme } from '../../core/enums/theme.enum';
import { THEME_LIST } from '../../core/constants/theme-list.constants';
import { STORAGE_CONSTANTS } from '../../core/constants/storage.constants';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'theme-modal',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './theme-modal.component.html',
  styleUrl: './theme-modal.component.scss',
  standalone: true,
})
export class ThemeModalComponent {
  private readonly storage = inject(StorageService);

  readonly isVisible = input<boolean>(false);
  readonly selectedTheme = input<Theme>(Theme.LIGHT);
  readonly close = output<void>();
  readonly themes = THEME_LIST;

  async selectTheme(theme: Theme): Promise<void> {
    console.info('App theme is', theme);
    await this.storage.set(STORAGE_CONSTANTS.LOCAL_THEME_KEY, theme);
    this.close.emit();
  }

  closeModal(): void {
    this.close.emit();
  }

  getThemeIcon(theme: Theme): string {
    switch (theme) {
      case Theme.DARK:
        return 'assets/icons/dark-mode-24x24.svg';
      case Theme.LIGHT:
      default:
        return 'assets/icons/light-mode-24x24.svg';
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

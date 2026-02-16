import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_CONSTANTS } from '../constants/storage.constants';
import { Theme } from '../enums/theme.enum';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);

  readonly currentTheme = signal<Theme>(Theme.LIGHT);
  readonly iconFolder = computed(() =>
    this.currentTheme() === Theme.DARK ? 'dark' : 'light'
  );

  constructor() {
    this.loadTheme();
  }

  async loadTheme(): Promise<void> {
    const stored = await this.storage.get(STORAGE_CONSTANTS.LOCAL_THEME_KEY);
    const theme = (stored as Theme) || Theme.LIGHT;
    this.applyTheme(theme);
  }

  async setTheme(theme: Theme): Promise<void> {
    await this.storage.set(STORAGE_CONSTANTS.LOCAL_THEME_KEY, theme);
    this.applyTheme(theme);
  }

  getThemedIconPath(iconName: string): string {
    return `assets/icons/${this.iconFolder()}/${iconName}`;
  }

  private applyTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }
}

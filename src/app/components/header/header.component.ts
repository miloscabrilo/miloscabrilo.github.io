import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { StorageService } from '../../core/services/storage.service';
import { STORAGE_CONSTANTS } from '../../core/constants/storage.constants';
import { Language } from '../../core/enums/language.enum';
import { Theme } from '../../core/enums/theme.enum';
import { ThemeModalComponent } from '../theme-modal/theme-modal.component';

@Component({
  selector: 'demetra-header',
  imports: [TranslatePipe, LanguageModalComponent, ThemeModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  host: {
    '(document:click)': 'handleClickOutside($event)',
  },
})
export class HeaderComponent {
  private readonly storage = inject(StorageService);

  readonly popover = viewChild.required<ElementRef>('popover');
  readonly triggerButton = viewChild.required<ElementRef>('triggerButton');

  readonly isPopoverOpen = signal(false);
  readonly showLangModal = signal(false);
  readonly showThemeModal = signal(false);
  readonly selectedLanguage = signal<Language>(Language.EN);
  readonly selectedTheme = signal<Theme>(Theme.LIGHT);

  constructor() {
    this.loadStoredLanguage();
    this.loadStoredTheme();
  }

  protected handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.isPopoverOpen() &&
      !this.popover().nativeElement.contains(target) &&
      !this.triggerButton().nativeElement.contains(target)
    ) {
      this.isPopoverOpen.set(false);
    }
  }

  togglePopover() {
    this.isPopoverOpen.update(v => !v);
  }

  getSelectedLanguageIcon(): string {
    switch (this.selectedLanguage()) {
      case Language.ME:
        return 'assets/icons/me-24x24.svg';
      case Language.UA:
        return 'assets/icons/ua-24x24.svg';
      case Language.TR:
        return 'assets/icons/tr-24x24.svg';
      case Language.RU:
        return 'assets/icons/ru-24x24.svg';
      case Language.EN:
      default:
        return 'assets/icons/en-24x24.svg';
    }
  }

  getSelectedThemeIcon(): string {
    switch (this.selectedTheme()) {
      case Theme.DARK:
        return 'assets/icons/dark-mode-24x24.svg';
      case Theme.LIGHT:
      default:
        return 'assets/icons/light-mode-24x24.svg';
    }
  }

  openLanguageModal(): void {
    console.log('Language modal opened');
    this.showLangModal.set(true);
    this.togglePopover();
  }

  openThemeModal(): void {
    console.log('Theme modal opened');
    this.showThemeModal.set(true);
    this.togglePopover();
  }

  onLangModalClosed() {
    this.showLangModal.set(false);
    this.loadStoredLanguage();
  }

  onThemeModalClosed() {
    this.showThemeModal.set(false);
    this.loadStoredTheme();
  }

  private async loadStoredLanguage(): Promise<void> {
    const storedLanguage = await this.storage.get(
      STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY
    );
    this.selectedLanguage.set((storedLanguage as Language) || Language.EN);
    console.info('App language is', this.selectedLanguage());
  }

  private async loadStoredTheme(): Promise<void> {
    const storedTheme = await this.storage.get(
      STORAGE_CONSTANTS.LOCAL_THEME_KEY
    );
    this.selectedTheme.set((storedTheme as Theme) || Theme.LIGHT);
    console.info('App theme is', this.selectedTheme());
  }
}

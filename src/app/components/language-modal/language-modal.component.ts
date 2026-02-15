import { Component, inject, input, output } from '@angular/core';
import { Language } from '../../core/enums/language.enum';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../core/services/storage.service';
import { STORAGE_CONSTANTS } from '../../core/constants/storage.constants';
import { CommonModule } from '@angular/common';
import { LANGUAGE_LIST } from '../../core/constants/language-list.constants';

@Component({
  selector: 'language-modal',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './language-modal.component.html',
  styleUrl: './language-modal.component.scss',
  standalone: true,
})
export class LanguageModalComponent {
  private readonly translate = inject(TranslateService);
  private readonly storage = inject(StorageService);

  readonly isVisible = input<boolean>(false);
  readonly selectedLanguage = input<Language>(Language.EN);
  readonly close = output<void>();
  readonly languages = LANGUAGE_LIST;

  async selectLanguage(lang: Language): Promise<void> {
    this.translate.use(lang);
    console.info('App language is', lang);
    await this.storage.set(STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY, lang);
    this.close.emit();
  }

  closeModal(): void {
    this.close.emit();
  }

  getLanguageIcon(lang: Language): string {
    switch (lang) {
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

  getLanguageName(lang: Language): string {
    switch (lang) {
      case Language.ME:
        return 'LANGUAGE.MONTENEGRIN';
      case Language.UA:
        return 'LANGUAGE.UKRAINIAN';
      case Language.TR:
        return 'LANGUAGE.TURKISH';
      case Language.RU:
        return 'LANGUAGE.RUSSIAN';
      case Language.EN:
      default:
        return 'LANGUAGE.ENGLISH';
    }
  }
}

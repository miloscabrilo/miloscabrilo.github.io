import { Component, EventEmitter, Input, Output } from '@angular/core';
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
})
export class LanguageModalComponent {
  @Input() public isVisible = false;
  @Input() public selectedLanguage: Language = Language.EN;
  @Output() public close = new EventEmitter<void>();
  public readonly languages = LANGUAGE_LIST;

  constructor(
    private translate: TranslateService,
    private storage: StorageService,
  ) {}

  public async selectLanguage(lang: Language): Promise<void> {
    this.translate.use(lang);
    console.info('App language is', lang);
    await this.storage.set(STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY, lang);
    this.close.emit();
  }

  public closeModal(): void {
    this.close.emit();
  }

  public getLanguageIcon(lang: Language): string {
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

  public getLanguageName(lang: Language): string {
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

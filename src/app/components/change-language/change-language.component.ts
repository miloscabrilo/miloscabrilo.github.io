import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from '../../core/enums/language.enum';
import { StorageService } from '../../core/services/storage.service';
import { STORAGE_CONSTANTS } from '../../core/constants/storage.constants';

@Component({
  selector: 'change-language',
  imports: [TranslateModule],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {
  public Language = Language;
  constructor(private translate: TranslateService, private storage: StorageService) {}

  changeLanguage(lang: Language) {
    this.translate.use(lang);
    this.storage.set(STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY, lang);
  }
}

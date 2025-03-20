import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { STORAGE_CONSTANTS } from './core/constants/storage.constants';
import { Language } from './core/enums/language.enum';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'home',
  imports: [TranslatePipe, ChangeLanguageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) {
    this.initAppLanguage();
  }

  public async initAppLanguage(): Promise<void> {
    const predefinedLang: string =
      (await this.storage.get(STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY)) ||
      Language.EN;
    this.translate.use(predefinedLang);
    console.info('App language is', predefinedLang);
  }
}

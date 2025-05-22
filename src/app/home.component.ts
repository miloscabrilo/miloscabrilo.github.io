import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { STORAGE_CONSTANTS } from './core/constants/storage.constants';
import { Language } from './core/enums/language.enum';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';
import { StorageService } from './core/services/storage.service';
import { HeaderComponent } from './components/header/header.component';
import { AccordionSectionComponent } from './components/accordion-section/accordion-section.component';
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ACCORDION_ASSISTANCE, ACCORDION_SERVICES } from './core/constants/accordion-list.constants';
import { ClientsFeedbacksComponent } from "./components/clients-feedbacks/clients-feedbacks.component";
import { FEEDBACK_LIST } from './core/constants/feedback-list.constants';

@Component({
  selector: 'home',
  imports: [
    TranslatePipe,
    // ChangeLanguageComponent,
    HeaderComponent,
    AccordionSectionComponent,
    AboutUsComponent,
    ClientsFeedbacksComponent,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  public readonly items1 = ACCORDION_SERVICES;
  public readonly items2 = ACCORDION_ASSISTANCE;
  public readonly feedbacks = FEEDBACK_LIST;

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

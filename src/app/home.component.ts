import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { STORAGE_CONSTANTS } from './core/constants/storage.constants';
import { Language } from './core/enums/language.enum';
import { StorageService } from './core/services/storage.service';
import { HeaderComponent } from './components/header/header.component';
import { AccordionSectionComponent } from './components/accordion-section/accordion-section.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ClientsFeedbacksComponent } from './components/clients-feedbacks/clients-feedbacks.component';
import {
  ACCORDION_ASSISTANCE,
  ACCORDION_SERVICES,
} from './core/constants/accordion-list.constants';
import { FEEDBACK_LIST } from './core/constants/feedback-list.constants';
import { ThemeService } from './core/services/theme.service';
import { DemetraIntroComponent } from './components/demetra-intro/demetra-intro';

@Component({
  selector: 'home',
  imports: [
    HeaderComponent,
    AccordionSectionComponent,
    AboutUsComponent,
    ClientsFeedbacksComponent,
    DemetraIntroComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  private readonly translate = inject(TranslateService);
  private readonly storage = inject(StorageService);
  readonly themeService = inject(ThemeService);

  readonly items1 = ACCORDION_SERVICES;
  readonly items2 = ACCORDION_ASSISTANCE;
  readonly feedbacks = FEEDBACK_LIST;

  constructor() {
    this.initAppLanguage();
  }

  public iconFolder(): string {
    return this.themeService.iconFolder();
  }

  async initAppLanguage(): Promise<void> {
    const stored = await this.storage.get(STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY);
    const predefinedLang =
      (typeof stored === 'string' ? stored : null) ?? Language.EN;
    this.translate.use(predefinedLang);
    console.info('App language is', predefinedLang);
  }
}

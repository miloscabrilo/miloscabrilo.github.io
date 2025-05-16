import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { STORAGE_CONSTANTS } from './core/constants/storage.constants';
import { Language } from './core/enums/language.enum';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';
import { StorageService } from './core/services/storage.service';
import { HeaderComponent } from './components/header/header.component';
import { AccordionSectionComponent } from './components/accordion-section/accordion-section.component';

@Component({
  selector: 'home',
  imports: [
    TranslatePipe,
    // ChangeLanguageComponent,
    HeaderComponent,
    AccordionSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  public items1: Array<{
    imageUrl: string;
    title: string;
    description: string;
  }> = [
    {
      imageUrl: 'assets/icons/computer-36x36.svg',
      title: 'SECTION1.ACCORDION1.TITLE',
      description: 'SECTION1.ACCORDION1.DESCRIPTION',
    },
    {
      imageUrl: 'assets/icons/company-36x36.svg',
      title: 'SECTION1.ACCORDION2.TITLE',
      description: 'SECTION1.ACCORDION2.DESCRIPTION',
    },
    {
      imageUrl: 'assets/icons/computer-36x36.svg',
      title: 'SECTION1.ACCORDION3.TITLE',
      description: 'SECTION1.ACCORDION3.DESCRIPTION',
    },
  ];

  public items2: Array<{
    imageUrl: string;
    title: string;
    description: string;
  }> = [
    {
      imageUrl: 'assets/icons/company-36x36.svg',
      title: 'SECTION2.ACCORDION1.TITLE',
      description: 'SECTION2.ACCORDION1.DESCRIPTION',
    },
    {
      imageUrl: 'assets/icons/computer-36x36.svg',
      title: 'SECTION2.ACCORDION2.TITLE',
      description: 'SECTION2.ACCORDION2.DESCRIPTION',
    },
  ];

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

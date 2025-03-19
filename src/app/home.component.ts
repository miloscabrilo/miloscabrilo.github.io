import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { STORAGE_CONSTANTS } from './core/constants/storage.constants';
import { Language } from './core/enums/language.enum';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'home',
  imports: [TranslatePipe, ChangeLanguageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  constructor(private translate: TranslateService) {
    const savedLang =
      localStorage.getItem(STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY) || Language.EN;
    //this.translate.addLangs(['me', 'en']);
    this.translate.setDefaultLang(Language.EN);
    this.translate.use(Language.EN);
  }
}

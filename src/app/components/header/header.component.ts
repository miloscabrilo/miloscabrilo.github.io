import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { StorageService } from '../../core/services/storage.service';
import { STORAGE_CONSTANTS } from '../../core/constants/storage.constants';
import { Language } from '../../core/enums/language.enum';

@Component({
  selector: 'demetra-header',
  imports: [TranslatePipe, LanguageModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('popover') popover!: ElementRef;
  @ViewChild('triggerButton') triggerButton!: ElementRef;
  public isPopoverOpen: boolean = false;
  public showLangModal: boolean = false;
  public selectedLanguage!: Language;

  constructor(private storage: StorageService) {
    this.loadStoredLanguage();
  }

  @HostListener('document:click', ['$event'])
  private handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      this.isPopoverOpen &&
      !this.popover.nativeElement.contains(target) &&
      !this.triggerButton.nativeElement.contains(target)
    ) {
      this.isPopoverOpen = false;
    }
  }

  public togglePopover() {
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  public getSelectedLanguageIcon(): string {
    switch (this.selectedLanguage) {
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

  public openLanguageModal(): void {
    console.log('Language modal opened');
    this.showLangModal = true;
    this.togglePopover();
  }

  public openThemeModal(): void {
    console.log('Theme modal opened');
    this.togglePopover();
  }

  public onLangModalClosed() {
    this.showLangModal = false;
    this.loadStoredLanguage();
  }

  private async loadStoredLanguage(): Promise<void> {
    const storedLanguage = await this.storage.get(
      STORAGE_CONSTANTS.LOCAL_LANGUAGE_KEY
    );
    this.selectedLanguage = storedLanguage || Language.EN;
    console.info('App language is', this.selectedLanguage);
  }
}

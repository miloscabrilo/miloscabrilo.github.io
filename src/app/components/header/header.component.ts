import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'demetra-header',
  imports: [TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isPopoverOpen: boolean = false;

  @ViewChild('popover') popover!: ElementRef;
  @ViewChild('triggerButton') triggerButton!: ElementRef;

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

  public openLanguageModal(): void {
    console.log('Language modal opened');
    this.togglePopover();
  }
  public openThemeModal(): void {
    console.log('Theme modal opened');
    this.togglePopover();
  }
}

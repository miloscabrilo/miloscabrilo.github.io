import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'accordion-item',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
})
export class AccordionItemComponent {
  @Input() public imageUrl: string = '';
  @Input() public title: string = '';
  @Input() public description: string = '';
  public isExpanded = false;

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}

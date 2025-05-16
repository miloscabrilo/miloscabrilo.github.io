import { Component, Input } from '@angular/core';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'accordion-section',
  imports: [AccordionItemComponent, TranslatePipe, CommonModule],
  templateUrl: './accordion-section.component.html',
  styleUrl: './accordion-section.component.scss',
})
export class AccordionSectionComponent {
  @Input() public title: string = '';
  @Input() public items: Array<{ imageUrl: string; title: string; description: string }> = [];
}

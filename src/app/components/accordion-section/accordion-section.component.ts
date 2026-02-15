import { Component, input } from '@angular/core';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'accordion-section',
  imports: [AccordionItemComponent, TranslatePipe, CommonModule],
  templateUrl: './accordion-section.component.html',
  styleUrl: './accordion-section.component.scss',
  standalone: true,
})
export class AccordionSectionComponent {
  readonly title = input<string>('');
  readonly items = input<Array<{ imageUrl: string; title: string; description: string }>>([]);
}

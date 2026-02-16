import { Component, inject, input } from '@angular/core';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'accordion-section',
  imports: [AccordionItemComponent, TranslatePipe],
  templateUrl: './accordion-section.component.html',
  styleUrl: './accordion-section.component.scss',
  standalone: true,
})
export class AccordionSectionComponent {
  readonly themeService = inject(ThemeService);

  readonly title = input<string>('');
  readonly items = input<Array<{ imageUrl: string; title: string; description: string }>>([]);
}

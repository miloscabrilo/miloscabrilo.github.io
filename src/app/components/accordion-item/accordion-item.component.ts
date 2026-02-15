import { Component, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'accordion-item',
  imports: [TranslatePipe],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
})
export class AccordionItemComponent {
  readonly imageUrl = input<string>('');
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly isExpanded = signal(false);

  toggle(): void {
    this.isExpanded.update(v => !v);
  }
}

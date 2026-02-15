import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'accordion-item',
  imports: [TranslatePipe, CommonModule],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  standalone: true,
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

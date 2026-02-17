import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { Theme } from '../../core/enums/theme.enum';

@Component({
  selector: 'contact-modal',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss',
  standalone: true,
})
export class ContactModalComponent {
  private readonly fb = inject(FormBuilder);
  readonly themeService = inject(ThemeService);

  readonly isVisible = input<boolean>(false);
  readonly close = output<void>();

  readonly contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    message: ['', Validators.required],
  });

  closeModal(): void {
    this.contactForm.reset();
    this.close.emit();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.info('Contact form submitted:', this.contactForm.value);
      this.contactForm.reset();
      this.close.emit();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  getCloseIcon(): string {
    switch (this.themeService.currentTheme()) {
      case Theme.DARK:
        return 'assets/icons/dark/close-24x24.svg';
      case Theme.LIGHT:
      default:
        return 'assets/icons/light/close-24x24.svg';
    }
  }
}

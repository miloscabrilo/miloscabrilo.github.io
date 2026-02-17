import { Component, effect, inject, input, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  readonly captchaA = signal(0);
  readonly captchaB = signal(0);

  readonly contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    message: ['', Validators.required],
    captcha: ['', [Validators.required, (c: AbstractControl): ValidationErrors | null =>
      c.value && Number(c.value) === this.captchaA() + this.captchaB() ? null : { captcha: true }
    ]],
  });

  constructor() {
    this.generateCaptcha();
    effect(() => {
      if (this.isVisible()) {
        this.generateCaptcha();
      }
    });
  }

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

  private generateCaptcha(): void {
    this.captchaA.set(Math.floor(Math.random() * 10) + 1);
    this.captchaB.set(Math.floor(Math.random() * 10) + 1);
  }
}

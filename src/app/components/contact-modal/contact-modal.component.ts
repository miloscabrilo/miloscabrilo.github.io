import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { ContactService } from '../../core/services/contact.service';
import { Theme } from '../../core/enums/theme.enum';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'contact-modal',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  readonly themeService = inject(ThemeService);

  readonly isVisible = input<boolean>(false);
  readonly close = output<void>();
  readonly isDarkTheme = computed(() => this.themeService.currentTheme() === Theme.DARK);

  readonly captchaA = signal(0);
  readonly captchaB = signal(0);
  readonly submitStatus = signal<SubmitStatus>('idle');

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
        this.submitStatus.set('idle');
      }
    });
  }

  closeModal(): void {
    this.contactForm.reset();
    this.submitStatus.set('idle');
    this.close.emit();
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, phone, message } = this.contactForm.value;
    this.submitStatus.set('sending');

    this.contactService.sendMessage({
      name: name!,
      email: email!,
      phone: phone!,
      message: message!,
    }).subscribe({
      next: () => {
        this.submitStatus.set('success');
        this.contactForm.reset();
      },
      error: (err) => {
        console.error('Failed to send message:', err);
        this.submitStatus.set('error');
      },
    });
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

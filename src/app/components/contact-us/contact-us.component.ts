import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactUsForm } from '../../interfaces/contact-us.interface';
import { ControlsOf } from '../../interfaces/form.interface';

@Component({
  selector: 'contact-us',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  standalone: true,
})
export class ContactUsComponent {
  private readonly http = inject(HttpClient);

  contactUsForm = new FormGroup<ControlsOf<ContactUsForm>>({
    name: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    number: new FormControl<string | null>(null),
    message: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit() {
    if (this.contactUsForm.valid) {
      console.log(this.contactUsForm.value);
      this.contactUsForm.reset();
    }
  }

  sendEmail(): void {
    if (this.contactUsForm.valid) {
      const contactUsData = this.contactUsForm.value;
      const apiEndpoint = 'http://localhost:3000/send-email';

      this.http.post(apiEndpoint, contactUsData).subscribe({
        next: (response) => {
          console.log('Email sent successfully!', response);
        },
        error: (error) => {
          console.error('Error sending email:', error);
        },
      });

      this.contactUsForm.reset();
    }
  }
}

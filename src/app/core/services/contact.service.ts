import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '../enums/language.enum';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  language: Language;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/send-email';

  sendMessage(payload: ContactPayload): Observable<unknown> {
    return this.http.post(this.apiUrl, payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api/send-email'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  sendEmail(emailData: {
    name: string;
    subject: string;
    message: string;
    to?: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, emailData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

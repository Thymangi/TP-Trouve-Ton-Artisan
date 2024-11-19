import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
  private jsonUrl = 'assets/data/artisans.json';
  private emailApiUrl = 'https://votre-backend.com/api/send-email'; // Remplacez par l'URL de votre backend pour l'envoi d'e-mails

  constructor(private http: HttpClient) {}

  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.jsonUrl);
  }

  getArtisanById(id: string): Observable<Artisan> {
    return this.getArtisans().pipe(
      map(
        (artisans) => artisans.find((artisan) => artisan.id === id) as Artisan
      )
    );
  }

  // Méthode pour envoyer un e-mail
  sendEmailToArtisan(formData: {
    name: string;
    subject: string;
    message: string;
  }): Observable<any> {
    return this.http.post(this.emailApiUrl, formData);
  }
}

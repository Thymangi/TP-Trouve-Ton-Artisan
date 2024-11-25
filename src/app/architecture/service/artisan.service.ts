import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
  private jsonUrl = 'assets/data/artisans.json'; // Chemin vers le fichier JSON local des artisans
  private apiUrl = 'http://localhost:3000/api'; // URL correcte du backend (port 3000 utilisé par le serveur Express)

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des artisans à partir du fichier JSON local.
   */
  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.jsonUrl);
  }

  /**
   * Récupère un artisan spécifique par son ID.
   * @param id ID de l'artisan à rechercher.
   */
  getArtisanById(id: string): Observable<Artisan> {
    return this.getArtisans().pipe(
      map(
        (artisans) => artisans.find((artisan) => artisan.id === id) as Artisan
      )
    );
  }

  /**
   * Envoie un e-mail à l'artisan via l'API backend.
   * @param data Objet contenant les données du formulaire.
   */
  sendEmail(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-email`, data); // Utilise le point d'API correctement configuré
  }
}

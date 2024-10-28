import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
  private jsonUrl = 'assets/data/artisans.json'; // Chemin du fichier JSON

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir tous les artisans
  getArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.jsonUrl);
  }

  // Méthode pour filtrer les artisans par catégorie
  getArtisansByCategory(category: string): Observable<Artisan[]> {
    return this.getArtisans().pipe(
      map((artisans: Artisan[]) =>
        artisans.filter((artisan) => artisan.category === category)
      )
    );
  }
}
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
}

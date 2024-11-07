import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../service/artisan.service';
import { Artisan } from '../service/artisan.model';

@Component({
  selector: 'app-fabrication',
  standalone: true,
  imports: [CommonModule], // Import du module nécessaire pour le standalone
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  artisans: Artisan[] = [];
  selectedArtisan: Artisan | null = null;

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    this.artisanService
      .getArtisansByCategory('Fabrication')
      .subscribe((data: Artisan[]) => {
        this.artisans = data;
      });
  }

  // Méthode pour sélectionner un artisan et afficher sa carte en grand
  selectArtisan(artisan: Artisan): void {
    this.selectedArtisan = artisan;
  }

  // Méthode pour réinitialiser la sélection d'artisan
  resetSelection(): void {
    this.selectedArtisan = null;
  }

  getStarClass(starIndex: number, note: number): string {
    if (note >= starIndex) {
      return 'full-star'; // étoile remplie
    } else if (note > starIndex - 1 && note < starIndex) {
      return 'half-star'; // étoile demi-remplie
    } else {
      return 'empty-star'; // étoile vide
    }
  }
}

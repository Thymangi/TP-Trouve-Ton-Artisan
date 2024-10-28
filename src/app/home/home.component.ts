import { CommonModule } from '@angular/common'; // Importer CommonModule
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArtisanService } from '../service/artisan.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule], // Ajouter CommonModule ici
})
export class HomeComponent implements OnInit {
  artisans: any[] = [];
  topArtisans: any[] = [];

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    // Charger les artisans depuis le fichier JSON
    this.artisanService.getArtisans().subscribe(
      (data) => {
        console.log('Artisans fetched from JSON:', data); // Ajoute un log ici pour vérifier les données
        this.artisans = data;
        this.topArtisans = this.getTopArtisans();
        console.log('Top artisans:', this.topArtisans); // Log des top artisans
      },
      (error) => {
        console.error('Error fetching artisans:', error);
      }
    );
  }

  // Fonction pour obtenir les trois meilleurs artisans
  getTopArtisans(): any[] {
    return this.artisans
      .sort((a, b) => parseFloat(b.note) - parseFloat(a.note))
      .slice(0, 3);
  }

  getStars(note: number): string[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(note)) {
        stars.push('★');
      } else {
        stars.push('☆'); // Étoile vide si la note est inférieure à 5
      }
    }
    return stars;
  }
}

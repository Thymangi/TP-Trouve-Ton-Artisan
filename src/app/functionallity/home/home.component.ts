import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ArtisanService } from '../../architecture/service/artisan.service.js';
import { Artisan } from '../../architecture/service/artisan.model';
import { SeoService } from '../../architecture/service/seo.service.js'; // Importer le SeoService

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class HomeComponent implements OnInit {
  artisans: Artisan[] = [];
  topArtisans: Artisan[] = [];

  constructor(
    private artisanService: ArtisanService,
    private router: Router,
    private seoService: SeoService // Injection du SeoService
  ) {}

  ngOnInit(): void {
    // Définir les balises SEO spécifiques à la page d'accueil
    this.seoService.updateMeta(
      'Trouve Ton Artisan - Meilleurs artisans en Auvergne-Rhône-Alpes',
      'Trouvez les meilleurs artisans en Auvergne-Rhône-Alpes pour tous vos besoins en bâtiment, services, fabrication, et alimentation.'
    );

    // Charger les artisans depuis le fichier JSON
    this.artisanService.getArtisans().subscribe(
      (data) => {
        console.log('Artisans fetched from JSON:', data); // Log pour vérifier les données
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
  getTopArtisans(): Artisan[] {
    return this.artisans.sort((a, b) => b.note - a.note).slice(0, 3);
  }

  // Méthode pour naviguer vers la page de détail de l'artisan
  viewArtisanDetail(artisan: Artisan): void {
    this.router.navigate(['/artisan', artisan.id]);
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

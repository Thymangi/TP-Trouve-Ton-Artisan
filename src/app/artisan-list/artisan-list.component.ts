import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Artisan } from '../service/artisan.model';
import { ArtisanService } from '../service/artisan.service';

@Component({
  selector: 'app-artisan-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.scss'],
})
export class ArtisanListComponent implements OnInit {
  artisans$: Observable<any[]> | null = null;
  artisans: Artisan[] = []; // Liste complète des artisans après réception
  filteredArtisans: Artisan[] = []; // Liste filtrée des artisans par catégorie ou recherche
  category: string | null = null;

  constructor(
    private artisanService: ArtisanService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    this.artisanService.getArtisans().subscribe((data: Artisan[]) => {
      this.artisans = data;
      this.filteredArtisans = this.category
        ? this.artisans.filter((artisan) => artisan.category === this.category)
        : this.artisans;
    });
  }
  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();

    // Filtre artisans par nom, spécialité ou ville
    this.filteredArtisans = this.artisans.filter(
      (artisan) =>
        artisan.name.toLowerCase().includes(searchTerm) ||
        artisan.specialty.toLowerCase().includes(searchTerm) ||
        artisan.location.toLowerCase().includes(searchTerm)
    );
  }

  // Redirection vers le détail de l'artisan
  goToArtisanDetail(artisan: any): void {
    this.router.navigate(['/artisan-detail', artisan.nom]);
  }

  // Méthode pour revenir à la liste complète
  clearCategory(): void {
    this.category = null; // Réinitialise la catégorie
    this.filteredArtisans = this.artisans; // Affiche tous les artisans
    this.router.navigate(['/artisans']); // Navigue vers la route sans filtre de catégorie
  }

  // Filtre les artisans par catégorie
  filterArtisansByCategory(): void {
    if (this.category) {
      this.filteredArtisans = this.artisans.filter(
        (artisan) => artisan.category === this.category
      );
    } else {
      this.filteredArtisans = this.artisans; // Si aucune catégorie, on affiche tous les artisans
    }
  }

  // Méthode pour mettre à jour la liste selon le terme de recherche
  filterArtisansBySearch(term: string): void {
    this.filteredArtisans = this.artisans.filter(
      (artisan) =>
        artisan.name.toLowerCase().includes(term.toLowerCase()) ||
        artisan.specialite.toLowerCase().includes(term.toLowerCase()) ||
        artisan.location.toLowerCase().includes(term.toLowerCase())
    );
  }

  getStars(note: number): string[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(note)) {
        stars.push('★'); // Étoile pleine
      } else {
        stars.push('☆'); // Étoile vide
      }
    }
    return stars;
  }
}

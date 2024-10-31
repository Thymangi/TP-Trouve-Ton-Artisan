import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtisanService } from '../service/artisan.service';
import { Artisan } from '../service/artisan.model';

@Component({
  selector: 'app-artisan-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss'],
})
export class ArtisanDetailComponent implements OnInit {
  artisans: Artisan[] = [];
  selectedArtisan: Artisan | null = null; // Artisan sélectionné pour l'affichage des détails

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtenez le terme de recherche de l'URL
    const searchTerm =
      this.route.snapshot.paramMap.get('searchTerm')?.toLowerCase() || '';

    // Charger les artisans et filtrer en fonction du terme de recherche
    // Vérifiez si le terme de recherche correspond à une catégorie
    if (
      ['batiment', 'services', 'fabrication', 'alimentation'].includes(
        searchTerm
      )
    ) {
      // Redirige vers la page de la catégorie correspondante
      this.router.navigate(['/category', searchTerm]);
    } else {
      // Utilise la méthode `getFilteredArtisans` pour charger les artisans correspondant au `searchTerm`
      this.artisanService
        .getFilteredArtisans(searchTerm)
        .subscribe((filteredArtisans: Artisan[]) => {
          this.artisans = filteredArtisans;
        });
    }
  }

  // Sélectionner un artisan spécifique
  selectArtisan(artisan: Artisan): void {
    this.selectedArtisan = artisan;
  }

  // Réinitialiser la sélection pour revenir à plusieurs cartes
  resetSelection(): void {
    this.selectedArtisan = null;
  }
}

//le formulaire de contact

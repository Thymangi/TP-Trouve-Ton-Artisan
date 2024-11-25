import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../../architecture/service/artisan.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../../Pipes/searchFilter.pipe';
import { SeoService } from '../../architecture/service/seo.service.js'; // Import du SeoService

@Component({
  selector: 'app-artisan-list',
  standalone: true,
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.scss'],
  imports: [CommonModule, RouterModule, SearchFilterPipe],
})
export class ArtisanListComponent implements OnInit {
  artisans: any[] = [];
  filteredArtisans: any[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';

  constructor(
    private artisanService: ArtisanService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService // Injecter le SeoService
  ) {}

  ngOnInit(): void {
    // Récupérer le paramètre 'category' pour filtrer les artisans
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || '';
      this.loadArtisans();
      this.updateSeo(); // Mettre à jour le SEO
    });
  }

  loadArtisans() {
    this.artisanService.getArtisans().subscribe((data: any[]) => {
      // Filtrer les artisans par catégorie si une catégorie est sélectionnée
      this.artisans = this.selectedCategory
        ? data.filter((artisan) => artisan.category === this.selectedCategory)
        : data;
      this.applyFilter();
    });
  }

  applyFilter() {
    // Appliquer la recherche avec la SearchFilterPipe
    this.filteredArtisans = new SearchFilterPipe().transform(
      this.artisans,
      this.searchTerm
    );
  }

  generateStars(note: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1); // Crée un tableau de [1, 2, 3, 4, 5]
  }

  viewDetails(artisan: any) {
    this.router.navigate(['/artisan', artisan.id]);
  }

  // Mettre à jour le SEO en fonction de la catégorie sélectionnée
  updateSeo(): void {
    const title = this.selectedCategory
      ? `Liste des artisans - ${this.selectedCategory}`
      : 'Liste des artisans - Toutes catégories';
    const description = this.selectedCategory
      ? `Découvrez notre liste d'artisans spécialisés dans le secteur ${this.selectedCategory}.`
      : 'Découvrez notre liste complète d’artisans qualifiés dans diverses catégories.';

    this.seoService.updateMeta(title, description);
  }
}

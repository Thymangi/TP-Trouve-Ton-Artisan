import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ArtisanService } from '../../architecture/service/artisan.service.js';
import { Artisan } from '../../architecture/service/artisan.model';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule, // Pour *ngIf, *ngFor
    RouterModule, // Pour routerLink
    FormsModule, // Pour [(ngModel)]
    NavComponent, // Pour le composant app-nav
  ],
})
export class HeaderComponent implements OnInit {
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = [];
  searchTerm: string = '';
  showDropdown: boolean = false;
  isMobileMenuOpen = false; // État pour le menu mobile

  constructor(private artisanService: ArtisanService, private router: Router) {}

  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe(
      (data) => (this.artisans = data),
      (error) =>
        console.error('Erreur lors de la récupération des artisans :', error)
    );
  }

  // Filtrage des artisans
  filterArtisans(): void {
    const search = this.searchTerm.trim().toLowerCase();
    if (search.length < 2) {
      this.filteredArtisans = [];
      this.showDropdown = false;
      return;
    }

    this.filteredArtisans = this.artisans.filter((artisan) =>
      ['name', 'location', 'category', 'specialty'].some((key) =>
        (artisan[key as keyof Artisan] || '')
          .toString()
          .toLowerCase()
          .includes(search)
      )
    );

    this.showDropdown = this.filteredArtisans.length > 0;

    // Redirection si la recherche n'est pas sur la bonne page
    if (this.router.url !== '/artisans') {
      this.router.navigate(['/artisans']);
    }
  }

  // Masquer la liste déroulante
  hideDropdown(): void {
    this.showDropdown = false;
  }

  // Afficher les détails d'un artisan
  viewArtisanDetail(artisan: Artisan): void {
    this.router.navigate(['/artisan', artisan.id]);
    this.hideDropdown(); // Cache la liste déroulante après la sélection
  }

  // Basculer le menu mobile
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Menu toggled. state:', this.isMobileMenuOpen);
  }
}

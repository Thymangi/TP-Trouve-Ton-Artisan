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
  imports: [CommonModule, RouterModule, FormsModule, NavComponent],
})
export class HeaderComponent implements OnInit {
  artisans: Artisan[] = [];
  filteredArtisans: Artisan[] = [];
  searchTerm: string = '';
  showDropdown: boolean = false;

  constructor(private artisanService: ArtisanService, private router: Router) {}

  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe(
      (data) => {
        console.log('Artisans fetched from JSON:', data);
        this.artisans = data;
      },
      (error) => {
        console.error('Error fetching artisans:', error);
      }
    );
  }

  // Filtrage des artisans en fonction de la recherche
  filterArtisans(): void {
    const search = this.searchTerm.trim().toLowerCase();
    if (search.length < 2) {
      this.filteredArtisans = [];
      this.showDropdown = false;
    } else {
      // Filtre les artisans en fonction de plusieurs critères
      this.filteredArtisans = this.artisans.filter(
        (artisan) =>
          artisan.name.toLowerCase().includes(search) ||
          artisan.location.toLowerCase().includes(search) ||
          artisan.category.toLowerCase().includes(search) ||
          artisan.specialty.toLowerCase().includes(search)
      );
      this.showDropdown = this.filteredArtisans.length > 0;
    }
    // Redirection vers la liste des artisans si on est sur une autre page
    if (this.router.url !== '/artisans') {
      this.router.navigate(['/artisans']);
    }
  }

  // Masquer la liste déroulante
  hideDropdown(): void {
    this.showDropdown = false;
  }

  // Afficher les détails de l'artisan
  viewArtisanDetail(artisan: Artisan): void {
    this.router.navigate(['/artisan', artisan.id]);
    this.hideDropdown(); // Masquer la liste après sélection
  }
}

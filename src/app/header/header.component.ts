import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../service/artisan.service'; // Importation du service
import { Router } from '@angular/router'; // Pour la navigation vers la page d'artisan

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  searchTerm: string = '';
  artisans: any[] = []; // Liste des artisans
  filteredSuggestions: any[] = []; // Suggestions filtrées

  constructor(private artisanService: ArtisanService, private router: Router) {}

  ngOnInit(): void {
    // Charger les artisans lors de l'initialisation du composant
    this.artisanService.getArtisans().subscribe((data) => {
      this.artisans = data;
    });
  }

  // Filtrer les suggestions en fonction du terme recherché
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim().toLowerCase();

    // Filtrer les artisans par nom, spécialité ou localisation
    this.filteredSuggestions = this.artisans.filter((artisan) => {
      return (
        artisan.name.toLowerCase().includes(this.searchTerm) ||
        artisan.specialty.toLowerCase().includes(this.searchTerm) ||
        artisan.location.toLowerCase().includes(this.searchTerm)
      );
    });
  }

  // Rediriger vers la page de l'artisan sélectionné
  onSelectSuggestion(artisan: any): void {
    this.router.navigate(['/artisan', artisan.id]); // Navigation vers la page de l'artisan sélectionné
    this.filteredSuggestions = []; // Vider les suggestions après sélection
  }
}

import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtisanService } from '../service/artisan.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Artisan } from '../service/artisan.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  searchTerm: string = '';
  artisans: Artisan[] = [];
  filteredSuggestions: {
    text: string;
    type: 'category' | 'artisan';
    artisan?: Artisan;
  }[] = [];
  maxSuggestions = 5;

  constructor(private artisanService: ArtisanService, private router: Router) {}

  ngOnInit(): void {
    // Charger les artisans lors de l'initialisation du composant
    this.artisanService.getArtisans().subscribe((data: Artisan[]) => {
      this.artisans = data;
    });
  }

  // Filtrer et trier les suggestions
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim().toLowerCase();

    const uniqueSuggestions = new Set<string>();

    // Filtrer les artisans pour n'afficher que ceux qui commencent par le terme recherché
    this.filteredSuggestions = this.artisans
      .map((artisan: Artisan) => {
        if (artisan.name.toLowerCase().startsWith(this.searchTerm)) {
          return { text: artisan.name, type: 'artisan', artisan };
        } else if (
          artisan.specialty.toLowerCase().startsWith(this.searchTerm)
        ) {
          return { text: artisan.specialty, type: 'artisan', artisan };
        } else if (artisan.location.toLowerCase().startsWith(this.searchTerm)) {
          return { text: artisan.location, type: 'artisan', artisan };
        } else if (artisan.category.toLowerCase().startsWith(this.searchTerm)) {
          return { text: artisan.category, type: 'category' };
        }
        return null;
      })
      .filter(
        (
          suggestion
        ): suggestion is {
          text: string;
          type: 'category' | 'artisan';
          artisan?: Artisan;
        } => suggestion !== null
      )
      .filter((suggestion) => {
        // Éviter les doublons dans les suggestions
        if (uniqueSuggestions.has(suggestion.text)) {
          return false;
        } else {
          uniqueSuggestions.add(suggestion.text);
          return true;
        }
      })
      .sort((a, b) => a.text.localeCompare(b.text)) // Trier par ordre alphabétique
      .slice(0, this.maxSuggestions); // Limiter les suggestions à 5
  }

  // Rediriger vers la page correspondante en fonction de la sélection
  onSelectSuggestion(suggestion: {
    text: string;
    type: 'category' | 'artisan';
    artisan?: Artisan;
  }): void {
    this.searchTerm = suggestion.text; // Afficher le texte sélectionné dans la barre de recherche

    if (suggestion.type === 'category') {
      // Redirection vers la page spécifique de la catégorie
      const categoryRoutes: { [key: string]: string } = {
        bâtiment: '/batiment',
        services: '/services',
        fabrication: '/fabrication',
        alimentation: '/alimentation',
      };
      const route = categoryRoutes[suggestion.text.toLowerCase()];
      if (route) {
        this.router.navigate([route]);
      }
    } else if (suggestion.type === 'artisan' && suggestion.artisan) {
      // Redirection vers la page de détail des artisans avec la possibilité d'afficher plusieurs artisans
      this.router.navigate(['/artisan-detail', suggestion.artisan.id]);
    }

    this.filteredSuggestions = []; // Vider les suggestions après sélection
  }
}

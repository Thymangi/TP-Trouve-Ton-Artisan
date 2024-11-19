import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../architecture/service/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isMobileMenuOpen = false; // État du menu mobile
  searchTerm: string = ''; // Déclaration de searchTerm
  isSmallScreen = false; // État de l'écran pour savoir si on est sur un petit écran

  constructor(private searchService: SearchService, private router: Router) {}

  // Détecte la taille de l'écran pour ajuster dynamiquement isSmallScreen
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSmallScreen = window.innerWidth <= 990; // Définit si l'écran est petit
    if (!this.isSmallScreen) {
      this.closeMobileMenu(); // Ferme le menu mobile si l'écran devient large
    }
  }

  // Initialisation du composant
  ngOnInit() {
    this.isSmallScreen = window.innerWidth <= 990;
  }

  // Basculer l'état du menu mobile
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Hamburger menu toggled:', this.isMobileMenuOpen);
  }

  // Fermer le menu mobile explicitement
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Navigation vers la page d'accueil
  navigateToHome() {
    this.closeMobileMenu(); // Ferme le menu mobile après clic
    this.router.navigate(['/']);
  }

  // Navigation vers une catégorie
  navigateToCategory(category: string) {
    this.closeMobileMenu(); // Ferme le menu mobile après clic
    this.router.navigate(['/artisans'], { queryParams: { category } });
  }
}

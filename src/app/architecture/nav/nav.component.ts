import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../architecture/service/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar">
      <!-- Liens de navigation -->
      <a class="nav-link" (click)="navigateToHome()">Accueil</a>
      <a class="nav-link" (click)="navigateToCategory('Bâtiment')">Bâtiment</a>
      <a class="nav-link" (click)="navigateToCategory('Services')">Services</a>
      <a class="nav-link" (click)="navigateToCategory('Fabrication')"
        >Fabrication</a
      >
      <a class="nav-link" (click)="navigateToCategory('Alimentation')"
        >Alimentation</a
      >

      <!-- Bouton pour le menu hamburger (petits écrans) -->
      <button class="hamburger-menu" (click)="toggleMobileMenu()">☰</button>

      <!-- Menu mobile (affiché seulement sur petits écrans) -->
      <div class="mobile-menu" *ngIf="isMobileMenuOpen">
        <a class="nav-link" (click)="navigateToHome()">Accueil</a>
        <a class="nav-link" (click)="navigateToCategory('Bâtiment')"
          >Bâtiment</a
        >
        <a class="nav-link" (click)="navigateToCategory('Services')"
          >Services</a
        >
        <a class="nav-link" (click)="navigateToCategory('Fabrication')"
          >Fabrication</a
        >
        <a class="nav-link" (click)="navigateToCategory('Alimentation')"
          >Alimentation</a
        >
      </div>
    </nav>
  `,
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isMobileMenuOpen = false;

  constructor(private searchService: SearchService, private router: Router) {}

  // Navigation vers l'accueil
  navigateToHome() {
    this.isMobileMenuOpen = false;
    this.router.navigate(['/']); // Redirection vers la page d'accueil
  }

  // Navigation vers une catégorie spécifique avec queryParams
  navigateToCategory(category: string) {
    this.isMobileMenuOpen = false;
    this.router.navigate(['/artisans'], { queryParams: { category } });
  }

  // Basculer l'état du menu mobile
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Hamburger menu toggled', this.isMobileMenuOpen); //  log
  }
}

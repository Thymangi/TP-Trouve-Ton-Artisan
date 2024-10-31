import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component'; // Import standalone header
import { FooterComponent } from './footer/footer.component'; // Import standalone footer
import { RouterOutlet } from '@angular/router'; // Pour afficher les routes
import { ArtisanListComponent } from './artisan-list/artisan-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // Indique que ce composant est standalone
  imports: [
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    ArtisanListComponent,
  ], // Importe les composants standalone
})
export class AppComponent {
  searchTerm: string = '';

  // Accéder au composant ArtisanList via ViewChild
  @ViewChild(ArtisanListComponent)
  artisanListComponent: ArtisanListComponent | null = null;

  onSearch(term: string) {
    this.searchTerm = term;
    if (this.artisanListComponent) {
      // Filtrer les artisans directement via le composant ArtisanListComponent
      this.artisanListComponent.filterArtisansBySearch(term);
    }
  }
}

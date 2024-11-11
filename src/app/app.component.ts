import { Component } from '@angular/core';
import { HeaderComponent } from './architecture/header/header.component'; // Import standalone header
import { FooterComponent } from './architecture/footer/footer.component'; // Import standalone footer
import { RouterOutlet, RouterModule } from '@angular/router'; // Pour afficher les routes et les liens

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, // Indique que ce composant est standalone
  imports: [RouterModule, HeaderComponent, FooterComponent, RouterOutlet], // Importe les composants standalone
})
export class AppComponent {
  searchTerm: string = '';

  onSearch(term: string) {
    this.searchTerm = term;
    // utiliser `searchTerm` pour déclencher des actions spécifiques.
  }
}

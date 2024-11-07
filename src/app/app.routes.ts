import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanDetailComponent } from './artisan-detail/artisan-detail.component';
import { ServicesComponent } from './services/services.component';
import { FabricationComponent } from './fabrication/fabrication.component.js';
import { BatimentComponent } from './batiment/batiment.component.js';
import { AlimentationComponent } from './alimentation/alimentation.component.js';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'fabrication', component: FabricationComponent },
  { path: 'batiment', component: BatimentComponent },
  { path: 'alimentation', component: AlimentationComponent },
  { path: 'artisan/:id', component: ArtisanDetailComponent }, // Route pour les détails d'un artisan
  { path: '**', component: NotFoundComponent }, // Pour gérer les routes non trouvées
];

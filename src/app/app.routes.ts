import { Routes } from '@angular/router';
import { HomeComponent } from './functionallity/home/home.component.js';
import { ArtisanListComponent } from './functionallity/artisan-list/artisan-list.component.js';
import { ArtisanDetailComponent } from './functionallity/artisan-detail/artisan-detail.component.js';
import { NotFoundComponent } from './functionallity/not-found/not-found.component.js';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: ArtisanListComponent },
  { path: 'artisans', component: ArtisanListComponent },
  { path: 'artisan/:id', component: ArtisanDetailComponent }, // Pour l'affichage détaillé d'un artisan
  { path: '**', component: NotFoundComponent },
];

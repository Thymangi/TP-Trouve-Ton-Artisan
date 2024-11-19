import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './functionallity/home/home.component.js';
import { ArtisanListComponent } from './functionallity/artisan-list/artisan-list.component.js';
import { ArtisanDetailComponent } from './functionallity/artisan-detail/artisan-detail.component.js';
import { NotFoundComponent } from './functionallity/not-found/not-found.component.js';
import { LiensFooterComponent } from './functionallity/liens-footer/liens-footer.component.js';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: ArtisanListComponent },
  { path: 'artisans', component: ArtisanListComponent },
  { path: 'artisan/:id', component: ArtisanDetailComponent }, // Pour l'affichage détaillé d'un artisan
  { path: 'legal-page', component: LiensFooterComponent },
  { path: 'donnees-personnelles', component: LiensFooterComponent },
  { path: 'accessibilite', component: LiensFooterComponent },
  { path: 'presse', component: LiensFooterComponent },
  { path: 'marches-publics', component: LiensFooterComponent },
  { path: 'venir-a-la-region', component: LiensFooterComponent },
  { path: 'contacts', component: LiensFooterComponent },
  { path: 'gestion-des-cookies', component: LiensFooterComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

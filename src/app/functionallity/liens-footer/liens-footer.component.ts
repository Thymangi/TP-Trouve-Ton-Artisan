import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../architecture/service/seo.service.js'; // Importer le SeoService

@Component({
  selector: 'app-liens-footer',
  templateUrl: './liens-footer.component.html',
  styleUrls: ['./liens-footer.component.css'],
})
export class LiensFooterComponent implements OnInit {
  pageTitle: string = 'Page Légale';

  constructor(private route: ActivatedRoute, private seoService: SeoService) {} // Injection du SeoService

  ngOnInit(): void {
    this.route.url.subscribe((urlSegment) => {
      const routePath = urlSegment[0]?.path || ''; // Récupère le premier segment de l'URL
      this.updatePageTitle(routePath);
    });
  }

  updatePageTitle(routePath: string): void {
    let title = '';
    let description = '';

    switch (routePath) {
      case 'presse':
        title = 'Presse';
        description =
          'Consultez les informations et les communiqués de presse officiels.';
        break;
      case 'donnees-personnelles':
        title = 'Données Personnelles';
        description =
          'Découvrez notre politique de gestion des données personnelles.';
        break;
      case 'accessibilite':
        title = 'Accessibilité';
        description = 'Informations sur l’accessibilité de notre site web.';
        break;
      case 'marches-publics':
        title = 'Marchés Publics';
        description =
          'Retrouvez les informations sur les marchés publics en cours.';
        break;
      case 'venir-a-la-region':
        title = 'Venir à la Région';
        description =
          'Informations pour venir à la Région Auvergne-Rhône-Alpes.';
        break;
      case 'contacts':
        title = 'Contacts';
        description = 'Trouvez les coordonnées pour nous contacter.';
        break;
      case 'gestion-des-cookies':
        title = 'Gestion des Cookies';
        description =
          'Gérez vos préférences en matière de cookies sur notre site.';
        break;
      default:
        title = 'Mentions Légales';
        description = 'Consultez les mentions légales de notre site.';
        break;
    }

    this.pageTitle = title;
    this.seoService.updateMeta(title, description); // Met à jour le titre et la description
  }
}

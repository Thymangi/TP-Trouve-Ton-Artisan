import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ArtisanService } from '../service/artisan.service';

@Component({
  selector: 'app-batiment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './batiment.component.html',
  styleUrls: ['./batiment.component.scss'],
})
export class BatimentComponent implements OnInit {
  artisans$: Observable<any[]> | null = null;

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    // Filtrer les artisans par catégorie 'Bâtiment'
    this.artisans$ = this.artisanService.getArtisansByCategory('Bâtiment');
  }
}

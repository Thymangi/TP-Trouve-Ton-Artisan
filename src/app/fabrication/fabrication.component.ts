import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../service/artisan.service';
import { Observable } from 'rxjs';
import { Artisan } from '../service/artisan.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fabrication',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fabrication.component.html',
  styleUrls: ['./fabrication.component.scss'],
})
export class FabricationComponent implements OnInit {
  artisans$: Observable<any[]> | null = null;

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    // Filtrer les artisans par catégorie 'Fabrication'
    this.artisans$ = this.artisanService.getArtisansByCategory('Fabrication');
  }
}

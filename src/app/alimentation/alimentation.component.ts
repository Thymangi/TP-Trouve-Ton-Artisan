import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../service/artisan.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alimentation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alimentation.component.html',
  styleUrls: ['./alimentation.component.scss'],
})
export class AlimentationComponent implements OnInit {
  artisans$: Observable<any[]> | null = null;

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    // Filtrer les artisans par catégorie 'Alimentation'
    this.artisans$ = this.artisanService.getArtisansByCategory('Alimentation');
  }
}

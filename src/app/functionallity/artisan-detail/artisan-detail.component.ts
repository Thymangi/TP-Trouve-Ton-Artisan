// src/app/functionality/artisan-detail/artisan-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../../architecture/service/artisan.service';
import { Artisan } from '../../architecture/service/artisan.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artisan-detail',
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss'],
  standalone: true,
  imports: [CommonModule], //Pour utilisez *ngIf ou *ngFor, mporter CommonModule
})
export class ArtisanDetailComponent implements OnInit {
  artisan: Artisan | undefined;

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) {}

  ngOnInit(): void {
    const artisanId = this.route.snapshot.paramMap.get('id');
    if (artisanId) {
      this.artisanService.getArtisanById(artisanId).subscribe(
        (data: Artisan) => {
          this.artisan = data;
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des détails de l'artisan",
            error
          );
        }
      );
    }
  }
  generateStars(note: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1); // Crée un tableau de [1, 2, 3, 4, 5]
  }
}

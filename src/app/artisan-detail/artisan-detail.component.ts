import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArtisanService } from '../service/artisan.service';

@Component({
  selector: 'app-artisan-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss'],
})
export class ArtisanDetailComponent implements OnInit {
  artisan: any;

  constructor(
    private artisanService: ArtisanService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe((data) => {
      this.artisan = data;
      console.log('Artisans:', this.artisan);
    });
  }
  // Méthode pour obtenir le nombre d'étoiles
  getStars(note: number): number[] {
    return Array(Math.round(note))
      .fill(0)
      .map((x, i) => i);
  }
}

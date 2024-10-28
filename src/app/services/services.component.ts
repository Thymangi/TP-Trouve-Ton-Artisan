import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../service/artisan.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  artisans$: Observable<any[]> | null = null;

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    // Filtrer les artisans par catégorie 'Services'
    this.artisans$ = this.artisanService.getArtisansByCategory('Services');
  }
}

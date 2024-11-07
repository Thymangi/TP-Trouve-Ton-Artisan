import { Component, Input } from '@angular/core';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artisan-rating',
  standalone: true,
  imports: [RatingModule, FormsModule],
  template: `
    <rating [(ngModel)]="note" [max]="5" [readonly]="true"></rating>
  `,
  styles: [
    `
      .stars {
        color: #ffd700;
      }
    `,
  ],
})
export class ArtisanRatingComponent {
  @Input() note: number = 0; // Reçoit la note en entrée
}

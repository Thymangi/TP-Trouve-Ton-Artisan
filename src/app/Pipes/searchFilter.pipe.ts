import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from '../architecture/service/artisan.model.js';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform(artisans: Artisan[], searchTerm: string): Artisan[] {
    if (!searchTerm) return artisans;
    searchTerm = searchTerm.toLowerCase();
    return artisans.filter(
      (artisan) =>
        artisan.name.toLowerCase().includes(searchTerm) ||
        artisan.specialty.toLowerCase().includes(searchTerm) ||
        artisan.location.toLowerCase().includes(searchTerm) ||
        artisan.category.toLowerCase().includes(searchTerm)
    );
  }
}

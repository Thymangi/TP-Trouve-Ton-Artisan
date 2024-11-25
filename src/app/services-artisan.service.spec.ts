import { TestBed } from '@angular/core/testing';

import { ServicesArtisanService } from './architecture/service/artisan.service';

describe('ServicesArtisanService', () => {
  let service: ServicesArtisanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesArtisanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

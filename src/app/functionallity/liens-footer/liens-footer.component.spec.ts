import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiensFooterComponent } from './liens-footer.component';

describe('LiensFooterComponent', () => {
  let component: LiensFooterComponent;
  let fixture: ComponentFixture<LiensFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiensFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiensFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

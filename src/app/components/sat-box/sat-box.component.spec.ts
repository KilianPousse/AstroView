import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatBoxComponent } from './sat-box.component';

describe('SatBoxComponent', () => {
  let component: SatBoxComponent;
  let fixture: ComponentFixture<SatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoBoxComponent } from './meteo-box.component';

describe('MeteoBoxComponent', () => {
  let component: MeteoBoxComponent;
  let fixture: ComponentFixture<MeteoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeteoBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

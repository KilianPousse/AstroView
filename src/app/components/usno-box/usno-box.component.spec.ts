import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsnoBoxComponent } from './usno-box.component';

describe('UsnoBoxComponent', () => {
  let component: UsnoBoxComponent;
  let fixture: ComponentFixture<UsnoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsnoBoxComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsnoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

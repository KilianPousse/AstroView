import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrosBoxComponent } from './astros-box.component';

describe('AstrosBoxComponent', () => {
  let component: AstrosBoxComponent;
  let fixture: ComponentFixture<AstrosBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstrosBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrosBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

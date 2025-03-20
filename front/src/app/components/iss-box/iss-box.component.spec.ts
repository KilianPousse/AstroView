import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssBoxComponent } from './iss-box.component';

describe('IssBoxComponent', () => {
  let component: IssBoxComponent;
  let fixture: ComponentFixture<IssBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

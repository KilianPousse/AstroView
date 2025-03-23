import { TestBed } from '@angular/core/testing';

import { AstrosService } from './astros.service';

describe('AstrosService', () => {
  let service: AstrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

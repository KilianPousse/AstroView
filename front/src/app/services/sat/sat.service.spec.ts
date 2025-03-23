import { TestBed } from '@angular/core/testing';

import { SatService } from './sat.service';

describe('SatService', () => {
  let service: SatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

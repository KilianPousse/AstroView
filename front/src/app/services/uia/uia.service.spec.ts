import { TestBed } from '@angular/core/testing';

import { UiaService } from './uia.service';

describe('UiaService', () => {
  let service: UiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

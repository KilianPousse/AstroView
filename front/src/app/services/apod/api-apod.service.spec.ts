import { TestBed } from '@angular/core/testing';

import { ApiApodService } from './api-apod.service';

describe('ApiApodService', () => {
  let service: ApiApodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiApodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

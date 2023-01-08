import { TestBed } from '@angular/core/testing';

import { ExpertServicesService } from './expert-services.service';

describe('ExpertServicesService', () => {
  let service: ExpertServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

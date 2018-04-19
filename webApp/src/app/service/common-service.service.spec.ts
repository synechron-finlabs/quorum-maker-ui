import { TestBed, inject } from '@angular/core/testing';

import { CommonServiceService } from './common-service.service';

describe('CommonServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonServiceService]
    });
  });

  it('should be created', inject([CommonServiceService], (service: CommonServiceService) => {
    expect(service).toBeTruthy();
  }));
});

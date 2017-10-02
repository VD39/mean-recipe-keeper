import { TestBed, inject } from '@angular/core/testing';

import { HandleRequestService } from './handle-request.service';

describe('HandleErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleRequestService]
    });
  });

  it('should be created', inject([HandleRequestService], (service: HandleRequestService) => {
    expect(service).toBeTruthy();
  }));
});

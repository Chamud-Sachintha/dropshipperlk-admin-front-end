import { TestBed } from '@angular/core/testing';

import { PayOutService } from './pay-out.service';

describe('PayOutService', () => {
  let service: PayOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

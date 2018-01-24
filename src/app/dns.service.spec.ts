import { TestBed, inject } from '@angular/core/testing';

import { DnsService } from './dns.service';

describe('DnsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DnsService]
    });
  });

  it('should be created', inject([DnsService], (service: DnsService) => {
    expect(service).toBeTruthy();
  }));
});

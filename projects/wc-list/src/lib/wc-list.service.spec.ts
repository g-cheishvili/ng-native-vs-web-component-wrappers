import { TestBed } from '@angular/core/testing';

import { WcListService } from './wc-list.service';

describe('WcListService', () => {
  let service: WcListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WcListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

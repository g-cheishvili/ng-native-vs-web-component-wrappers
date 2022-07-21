import { TestBed } from '@angular/core/testing';

import { NgListService } from './ng-list.service';

describe('NgListService', () => {
  let service: NgListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

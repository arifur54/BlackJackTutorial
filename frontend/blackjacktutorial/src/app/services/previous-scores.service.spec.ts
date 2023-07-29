import { TestBed } from '@angular/core/testing';

import { PreviousScoresService } from './previous-scores.service';

describe('PreviousScoresService', () => {
  let service: PreviousScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

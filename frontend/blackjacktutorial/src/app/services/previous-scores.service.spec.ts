import { TestBed } from '@angular/core/testing';

import { PreviousScoreService } from './previous-scores.service';

describe('PreviousScoresService', () => {
  let service: PreviousScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

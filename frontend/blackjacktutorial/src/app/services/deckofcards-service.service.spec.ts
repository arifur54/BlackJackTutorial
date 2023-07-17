import { TestBed } from '@angular/core/testing';

import { DeckOfCardsService } from './deckofcards-service.service'';

describe('DeckofcardsServiceService', () => {
  let service: DeckOfCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckOfCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

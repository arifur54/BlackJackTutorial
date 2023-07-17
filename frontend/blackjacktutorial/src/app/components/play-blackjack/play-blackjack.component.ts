import { Component, OnInit } from '@angular/core';
import { DeckOfCardsService } from '../../services/deckofcards-service.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-play-blackjack',
  templateUrl: './play-blackjack.component.html',
  styleUrls: ['./play-blackjack.component.css']
})
export class PlayBlackjackComponent implements OnInit {
  
  cards: Card[] = [];
  playerHand: Card[] = [];
  dealerHand: Card[] = [];
  playerScore = 0;
  dealerScore = 0;
  gameOver = false;
  winner: string | null = null;

  constructor(private deckOfCardsService: DeckOfCardsService) {}

  ngOnInit(): void {
    this.resetGame();
  }

  async resetGame(): Promise<void> {
    try {
      await this.deckOfCardsService.createDeck();
      const deckId = this.deckOfCardsService.getDeckId();
      const drawnCards = await this.deckOfCardsService.drawCards(deckId, 4);
      this.cards = drawnCards.cards;
      this.playerHand = [this.cards[0], this.cards[1]];
      this.dealerHand = [this.cards[2], this.cards[3]];
      this.calculateScores();
      this.gameOver = false;
      this.winner = null;
    } catch (error) {
      console.error('Error creating/resetting deck:', error);
    }
  }

  async onHit(): Promise<void> {
    try {
      const drawnCard = await this.deckOfCardsService.drawSingleCard();
      this.playerHand.push(drawnCard.cards[0]);
      this.calculateScores();
      this.checkForPlayerBust();
    } catch (error) {
      console.error('Error drawing a card:', error);
    }
  }

  onStand(): void {
    this.revealDealerCard();
    this.calculateScores();
    this.checkForWinner();
    this.gameOver = true;
  }

  revealDealerCard(): void {
    if (this.dealerHand.length === 1) {
      this.dealerHand.push(this.cards[3]);
    }
  }

  calculateScores(): void {
    this.playerScore = this.calculateHandScore(this.playerHand);
    this.dealerScore = this.calculateHandScore(this.dealerHand);
  }

  calculateHandScore(hand: Card[]): number {
    let score = 0;
    let hasAce = false;

    for (const card of hand) {
      const cardValue = card.value;
      if (cardValue === 'ACE') {
        hasAce = true;
        score += 11;
      } else if (['KING', 'QUEEN', 'JACK'].includes(cardValue)) {
        score += 10;
      } else {
        score += parseInt(cardValue);
      }
    }

    if (hasAce && score > 21) {
      score -= 10;
    }

    return score;
  }

  checkForPlayerBust(): void {
    if (this.playerScore > 21) {
      this.winner = 'dealer';
      this.gameOver = true;
    }
  }

  checkForWinner(): void {
    if (this.dealerScore > 21) {
      this.winner = 'player';
    } else if (this.dealerScore === this.playerScore) {
      this.winner = 'tie';
    } else if (this.dealerScore > this.playerScore) {
      this.winner = 'dealer';
    } else {
      this.winner = 'player';
    }
  }

  async onReset(): Promise<void> {
    this.resetGame();
  }

}
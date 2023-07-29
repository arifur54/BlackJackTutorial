import { Component, OnInit } from '@angular/core';
import { DeckOfCardsService } from '../../services/deckofcards-service.service';
import { Card } from '../../models/card.model';
import { PreviousScoreService } from '../../services/previous-scores.service';
import { PreviousScore } from '../../models/previousScore.model';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/services/auth.service';


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
  showSecondCard = false;
  userId: string = '';

  constructor(
    private deckOfCardsService: DeckOfCardsService,
    private authService: AuthService,
    private previousScoreService: PreviousScoreService 
  ) { }

  ngOnInit(): void {
    this.resetGame();
    this.userId = this.authService.getUserId() 
    console.log(this.userId);
  }
  
  // creates the Result object to store in database.
  saveResult(): void {
    const resultData: PreviousScore = {
      user_id: this.userId, 
      result: this.winner === 'player' ? 'you win' : this.winner === 'dealer' ? 'you lose / dealer wins' : `it's a tie`,
      winningCards: this.winner === 'player' ? this.playerHand : this.dealerHand,
      playedAt: new Date()
    };

    this.previousScoreService.saveResult(resultData);
  }

  // Resets game, first during the start of the game and later once the PlayAgain button is clicked.
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
      this.showSecondCard = false;
      this.winner = null;
    } catch (error) {
      console.error('Error creating/resetting deck:', error);
    }
  }

  // On thi will draw a singleCard from the deck
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

  // onStand will reveal the Dealer card, calculate the Scores and check for winner, and completes the game. 
  onStand(): void {
    this.revealDealerCard();
    this.calculateScores();
    this.checkForWinner();
    this.showSecondCard = true;
    this.gameOver = true;
  }

  // reveals the Dealers hidden card
  revealDealerCard(): void {
    if (this.dealerHand.length === 1) {
      this.dealerHand.push(this.cards[3]);
    }
  }

  // calculates the score. 
  calculateScores(): void {
    this.playerScore = this.calculateHandScore(this.playerHand);
    this.dealerScore = this.calculateHandScore(this.dealerHand);
  }

  // calculate the currenet score, and sets the appropriate value for the cards
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

  // checks if the player score is more then > 21, and saves the result into database. 
  checkForPlayerBust(): void {
    if (this.playerScore > 21) {
      this.winner = 'dealer';
      this.gameOver = true;
      this.saveResult();
    }
  }

  // check for the winner and save the result into database
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
    this.saveResult();
  }

  async onReset(): Promise<void> {
    this.resetGame();
  }

}

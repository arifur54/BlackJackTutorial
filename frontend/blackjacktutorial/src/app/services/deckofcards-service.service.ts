import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsService {
  private readonly apiUrl = 'https://deckofcardsapi.com/api/deck';
  private deckId: string = "";

  constructor() {}

  async createDeck(): Promise<Card> {
    const url = `${this.apiUrl}/new/shuffle/?deck_count=1`;
    try {
      const response = await axios.get<Card>(url);
      this.deckId = response.data.deck_id;
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async drawCards(deckId: string, count: number): Promise<any> {
    const url = `${this.apiUrl}/${deckId}/draw/?count=${count}`;
    try {
      const response = await axios.get<any>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async drawSingleCard(): Promise<any> {
    return this.drawCards(this.deckId, 1);
  }

  async resetDeck(): Promise<Card> {
    return this.createDeck();
  }

  getDeckId(): string {
    return this.deckId;
  }
}
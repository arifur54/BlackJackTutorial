import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { addPreviousScore } from '../store/previousScore/previous-score.actions';
import { PreviousScore } from '../models/previousScore.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PreviousScoreService {
  private apiUrl = `http://localhost:5000/previousScore`;

  constructor(private store: Store) {}

  saveResult(resultData: PreviousScore): Observable<any> {
    return from(
      axios
        .post(`${this.apiUrl}/save_result`, resultData)
        .then((response) => {
          console.log('Result saved successfully:', response);
          return response;
        })
        .catch((error) => {
          console.error('Error saving result:', error);
          throw error;
        })
    );
  }

  getResults() {
    return axios.get(`${this.apiUrl}/get_result`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching previous scores:', error);
        return [];
      });
  }

  async getResultsByUserId(userId: string) {
    console.log(userId)
    try {
      const response = await axios.get(`${this.apiUrl}/get_results/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching previous scores by user_id:', error);
      return [];
    }
  }

  async deleteResult(id: string): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/delete_result/${id}`);
      console.log('Result deleted successfully');
    } catch (error) {
      console.error('Error deleting result:', error);
      throw error;
    }
  }

}


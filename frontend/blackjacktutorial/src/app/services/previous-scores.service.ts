import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { PreviousScore } from '../models/previousScore.model';

// This service takes care of all the score related data handelling.

@Injectable({
  providedIn: 'root',
})
export class PreviousScoreService {
  private apiUrl = `http://localhost:5000/previousScore`;

  constructor(private store: Store) {}
  
  // Saves the score to the database.
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

  // gets all results or score from data base. (not implemented for the current version of the app)
  getResults() {
    return axios.get(`${this.apiUrl}/get_result`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching previous scores:', error);
        return [];
      });
  }
  
  // gets all results or score from data base based on userID.
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
  
  // deletes a specific score based on resultID.
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


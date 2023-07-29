import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Subject } from 'rxjs';

// This service takes care of all the data handeling related to Authantication servers.
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';
  
  private userId: string = '';
  private readonly userIdKey = 'userId';
  private isLoggedIn = false;
  private readonly isLoggedInKey = 'isLoggedIn';


  constructor() {
    this.isLoggedIn = this.getIsLoggedInFromLocalStorage();
  }

  // login the user and stores isLoggedIn and userId to local storage
  login(credentials: any) {
    return new Observable(observer => {
      axios.post(`${this.apiUrl}/login`, credentials)
        .then(response => {
          this.isLoggedIn = true;
          this.userId = response.data.userId;
          this.setUserIdInLocalStroage(response.data.userId);
          this.setIsLoggedInInLocalStorage(true);
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // gets logged in status from local storage
  private getIsLoggedInFromLocalStorage(): boolean {
    const isLoggedIn = localStorage.getItem(this.isLoggedInKey);
    return isLoggedIn === 'true';
  }
  
  // logs out the user and clears the local storage
  logout(): void {
    this.isLoggedIn = false;
    this.userId = '';
    this.setIsLoggedInInLocalStorage(false);
    this.setUserIdInLocalStroage('');
  }

    
  getUserId(): any {
    const userId = localStorage.getItem(this.userIdKey);
    return userId;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  private setIsLoggedInInLocalStorage(value: boolean): void {
    localStorage.setItem(this.isLoggedInKey, String(value));
  }

  private setUserIdInLocalStroage(value: String): void {
    localStorage.setItem(this.userIdKey, String(value));
  }


  register(user: any) {
    return axios.post(`${this.apiUrl}/register`, user);
  }
}
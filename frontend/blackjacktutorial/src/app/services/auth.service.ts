import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  private isLoggedIn = false;
  private readonly isLoggedInKey = 'isLoggedIn';

  constructor() {
    this.isLoggedIn = this.getIsLoggedInFromLocalStorage();
   }

  private getIsLoggedInFromLocalStorage(): boolean {
    const isLoggedIn = localStorage.getItem(this.isLoggedInKey);
    return isLoggedIn === 'true';
  }

  login(credentials: any) {
    return new Observable(observer => {
      axios.post(`${this.apiUrl}/login`, credentials)
        .then(response => {
          this.isLoggedIn = true;
          this.setIsLoggedInInLocalStorage(true);
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.setIsLoggedInInLocalStorage(false);
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  private setIsLoggedInInLocalStorage(value: boolean): void {
    localStorage.setItem(this.isLoggedInKey, String(value));
  }

  register(user: any) {
    console.log(user)
    return axios.post(`${this.apiUrl}/register`, user);
  }
}
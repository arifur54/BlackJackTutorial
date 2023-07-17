import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
  }

  toggleLogin(registerClicked: boolean): void {
    this.onToggle.emit(registerClicked);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => { window.location.reload(); })
  }

}
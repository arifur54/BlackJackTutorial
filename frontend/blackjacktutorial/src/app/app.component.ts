import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin: boolean = true;

  onToggle(showLogin: boolean) {
    this.showLogin = showLogin;
  }
}
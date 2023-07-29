import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PastScoreComponent } from './components/past-score/past-score.component';
import { HelpMenuComponent } from './components/help-menu/help-menu.component';
import { PlayBlackjackComponent } from './components/play-blackjack/play-blackjack.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, // Use AlreadyAuthGuard here
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'past-score', component: PastScoreComponent},
  { path: 'help', component: HelpMenuComponent},
  { path: 'play-blackjack', component: PlayBlackjackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
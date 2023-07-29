// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { PlayBlackjackComponent } from './components/play-blackjack/play-blackjack.component';
import { PastScoreComponent } from './components/past-score/past-score.component';
import { HelpMenuComponent } from './components/help-menu/help-menu.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service'; 
import { previousScoreReducer } from './store/previousScore/previous-score.reducer';
import { PreviousScoreEffects } from './store/previousScore/previous-score.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PlayBlackjackComponent,
    PastScoreComponent,
    HelpMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ auth: authReducer , previousScore: previousScoreReducer }),
    EffectsModule.forRoot([AuthEffects, PreviousScoreEffects]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

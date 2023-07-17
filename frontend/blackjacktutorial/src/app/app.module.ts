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
import { authReducer } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { PlayBlackjackComponent } from './components/play-blackjack/play-blackjack.component';
import { PastScoreComponent } from './components/past-score/past-score.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { HelpMenuComponent } from './components/help-menu/help-menu.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PlayBlackjackComponent,
    PastScoreComponent,
    HowToPlayComponent,
    HelpMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

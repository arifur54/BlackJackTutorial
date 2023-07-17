import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { of, from } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        from(this.authService.login(action)).pipe(
          map(() => AuthActions.loginSuccess()),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) =>
        from(this.authService.register(action)).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError((error) => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/home']).then(() => { window.location.reload(); })
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
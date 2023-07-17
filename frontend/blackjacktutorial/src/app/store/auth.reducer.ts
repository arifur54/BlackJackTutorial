import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state) => ({ ...state, isLoggedIn: true })),
  on(AuthActions.loginFailure, (state) => ({ ...state, isLoggedIn: false })),
  on(AuthActions.registerSuccess, (state) => ({ ...state, isLoggedIn: true })),
  on(AuthActions.registerFailure, (state) => ({ ...state, isLoggedIn: false }))
);
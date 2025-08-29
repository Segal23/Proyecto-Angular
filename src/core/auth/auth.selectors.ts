import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export interface AppState {
    auth: AuthState;
}

export const selectAuth = (state: AppState) => state.auth;

export const selectRole = createSelector(
    selectAuth,
    (auth) => auth.role
);

export const selectUser = createSelector(
    selectAuth,
    (auth) => auth.user
);
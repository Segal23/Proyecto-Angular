import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
    user: string | null;
    role: 'admin' | 'user' | null;
}

export const initialState: AuthState = { user: null, role: null };

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user, role }) => ({ ...state, user, role })),
    on(logout, () => initialState)
);
export { loginSuccess, logout };


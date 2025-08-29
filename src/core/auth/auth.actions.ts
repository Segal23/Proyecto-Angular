import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: string; role: 'admin' | 'user' }>()
);

export const logout = createAction('[Auth] Logout');
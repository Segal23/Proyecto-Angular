import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UsuariosAPI } from '../../features/usuarios/usuarios-api';
import { loginSuccess, logout } from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private store: Store<{ auth: AuthState }>,
    private usuariosAPI: UsuariosAPI
  ) {}

  login(username: string, password: string): Observable<boolean> {
    return this.usuariosAPI.getUsuarios().pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return false;

        const role: 'admin' | 'user' = user.role === 'admin' ? 'admin' : 'user';
        const authData = { user: user.username, role };
        localStorage.setItem('auth', JSON.stringify(authData));
        return authData;
      }),
      tap(authData => {
        if (authData) {
          this.store.dispatch(loginSuccess(authData as { user: string; role: 'admin' | 'user' }));
        }
      }),
      map(authData => !!authData), 
      catchError(err => {
        console.error('Error login API', err);
        return of(false); 
      })
    );
  }

  logout() {
    localStorage.removeItem('auth');
    this.store.dispatch(logout());
  }

  loadAuthFromStorage() {
    const saved = localStorage.getItem('auth');
    if (saved) {
      const authState = JSON.parse(saved);
      this.store.dispatch(loginSuccess(authState));
    }
  }
}
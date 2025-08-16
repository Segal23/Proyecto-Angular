import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, loginSuccess, logout } from './auth.reducer';
import { Router } from '@angular/router';

interface User {
  user: string;
  pass: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    { user: 'admin', pass: 'Admin123!', role: 'admin' },
    { user: 'user1', pass: 'User123!', role: 'user' },
    { user: 'user2', pass: 'User456!', role: 'user' }
  ];

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  loadAuthFromStorage(): Promise<void> {
    return new Promise(resolve => {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const { user, role } = JSON.parse(stored);
        this.store.dispatch(loginSuccess({ user, role }));
      }
      resolve();
    });
  }

  login(username: string, password: string): void {
    const found = this.users.find(u => u.user === username && u.pass === password);
    if (!found) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    localStorage.setItem('auth', JSON.stringify({ user: found.user, role: found.role }));
    this.store.dispatch(loginSuccess({ user: found.user, role: found.role }));
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }
}

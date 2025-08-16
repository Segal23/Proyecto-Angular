import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AuthState } from './auth.reducer';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  canActivate() {
    return this.store.select('auth').pipe(
      take(1),
      map(auth => {
        if (auth.role === 'admin') return true;
        this.router.navigate(['/alumnos']);
        return false;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthState } from './auth.reducer';
import { RoutePaths } from '../../shared/routes';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map(auth => {
        if (auth.role === 'admin') return true;
        return this.router.createUrlTree([`/${RoutePaths.ALUMNOS}`]);
      })
    );
  }
}
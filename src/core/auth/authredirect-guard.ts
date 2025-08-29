import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, map } from 'rxjs';
import { AuthState } from './auth.reducer';
import { RoutePaths } from '../../shared/routes';

@Injectable({ providedIn: 'root' })
export class AuthRedirectGuard implements CanActivate {
  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map(auth => 
        auth.user 
          ? this.router.createUrlTree([`/${RoutePaths.ALUMNOS}`]) 
          : this.router.createUrlTree([`/${RoutePaths.LOGIN}`])
      )
    );
  }
}
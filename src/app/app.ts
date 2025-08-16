import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../core/auth/auth.reducer';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from '../features/toolbar/toolbar';
import { Navbar } from '../features/navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toolbar, Navbar, CommonModule],
  templateUrl: './app.html'
})
export class App {
  auth$: Observable<AuthState>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.auth$ = this.store.select('auth');
  }
}

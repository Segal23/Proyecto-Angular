import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../core/auth/auth.reducer';
import { selectAuth } from '../../core/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class Toolbar {
  auth$: Observable<AuthState>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.auth$ = this.store.select(selectAuth);
  }
}

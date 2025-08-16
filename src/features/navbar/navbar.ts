import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../core/auth/auth.reducer';
import { selectRole } from '../../core/auth/auth.selectors';
import { AuthService } from '../../core/auth/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  role$: Observable<string | null>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService,
    private router: Router
  ) {
    this.role$ = this.store.select(selectRole);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

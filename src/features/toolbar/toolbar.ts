import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../core/auth/auth.reducer';
import { selectAuth } from '../../core/auth/auth.selectors';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class Toolbar implements OnInit {
  auth$: Observable<AuthState>;
  fullTitle: string = 'Gestor Académico';

  constructor(private store: Store<{ auth: AuthState }>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.auth$ = this.store.select(selectAuth);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        return route?.snapshot.data['title'];
      })
    ).subscribe(title => {
      this.fullTitle = title ? `Gestor Académico - ${title}` : 'Gestor Académico';
    });
  }
}

import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Inscription } from '../../../shared/entities';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../shared/routes';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscriptions-table',
  imports: [MatTableModule, MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './inscriptions-table.html',
  styleUrl: './inscriptions-table.css'
})
export class InscriptionsTable {

  @Input() inscriptions: Inscription[] = [];
  @Output() deleteEvent = new EventEmitter<Inscription>();
  @Output() editEvent = new EventEmitter<Inscription>();

  isAdmin: boolean = false;
  displayedColumns: string[] = ['studentDNI', 'courseCode', 'grade', 'status', 'actions'];

  private roleSub: Subscription;
  
  constructor(private router: Router, public authService: AuthService) {
    this.roleSub = this.authService.role$.subscribe(role => {
      this.isAdmin = role === 'admin';
    });
  }

  ngOnDestroy() {
    if (this.roleSub) {
      this.roleSub.unsubscribe();
    }
  }

  viewDetails(inscription: Inscription) {
    this.router.navigate([`/${RoutePaths.VIEW_INSCRIPTION}`, ], { state: { inscription : inscription } });
  }

  deleteInscription(inscription: Inscription) {
    this.deleteEvent.emit(inscription);
  }

  editInscription(inscription : Inscription){
    this.router.navigate([`/${RoutePaths.EDIT_INSCRIPTION}`,], { state: { inscription : inscription } });
  }
}

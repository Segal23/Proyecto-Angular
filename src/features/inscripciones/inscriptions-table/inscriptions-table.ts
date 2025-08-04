import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Inscription } from '../../../shared/entities';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../shared/routes';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-inscriptions-table',
  imports: [MatTableModule, MatIconModule, MatTooltipModule],
  templateUrl: './inscriptions-table.html',
  styleUrl: './inscriptions-table.css'
})
export class InscriptionsTable {

  @Input() inscriptions: Inscription[] = [];
  @Output() deleteEvent = new EventEmitter<Inscription>();
  @Output() editEvent = new EventEmitter<Inscription>();

  displayedColumns: string[] = ['studentDNI', 'courseCode', 'grade', 'status', 'actions'];

  constructor(private router: Router){}

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

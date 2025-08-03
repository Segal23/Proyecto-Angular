import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Inscription } from '../../../shared/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscriptions-table',
  imports: [MatTableModule],
  templateUrl: './inscriptions-table.html',
  styleUrl: './inscriptions-table.css'
})
export class InscriptionsTable {

  @Input() inscriptions: Inscription[] = []; 

  displayedColumns: string[] = ['studentDNI', 'courseCode', 'grade', 'status', 'actions'];

  constructor(private router: Router){}

  viewDetails(inscription: Inscription) {
    this.router.navigate(['/view-inscription', ], { state: { inscription : inscription } });
  }
}

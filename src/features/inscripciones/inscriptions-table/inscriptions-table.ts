import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Inscription } from '../../../shared/entities';

@Component({
  selector: 'app-inscriptions-table',
  imports: [MatTableModule],
  templateUrl: './inscriptions-table.html',
  styleUrl: './inscriptions-table.css'
})
export class InscriptionsTable {

  @Input() inscriptions: Inscription[] = []; 

  displayedColumns: string[] = ['studentDNI', 'courseCode', 'grade', 'status'];
}

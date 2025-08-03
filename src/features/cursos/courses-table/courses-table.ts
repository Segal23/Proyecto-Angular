import { Component, Input } from '@angular/core';
import { Course } from '../../../shared/entities';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.css'
})
export class CoursesTable {

  @Input() courses: Course[] = []; 

  displayedColumns: string[] = ['name', 'code', 'credits', 'description'];
}


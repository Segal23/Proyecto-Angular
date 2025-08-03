import { Component, Input } from '@angular/core';
import { Course } from '../../../shared/entities';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.css'
})
export class CoursesTable {

  @Input() courses: Course[] = []; 

  displayedColumns: string[] = ['name', 'code', 'credits', 'description', 'actions'];

  constructor(private router: Router){}

  viewDetails(course: Course) {
    this.router.navigate(['/view-course', ], { state: { course : course } });
  }
}


import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() deleteEvent = new EventEmitter<Course>();
  @Output() editEvent = new EventEmitter<Course>();

  displayedColumns: string[] = ['name', 'code', 'credits', 'description', 'actions'];

  constructor(private router: Router){}

  viewDetails(course: Course) {
    this.router.navigate(['/view-course', ], { state: { course : course } });
  }

  deleteCourse(course: Course) {
    console.log('Eliminando curso:', course);
    this.deleteEvent.emit(course);
  }

  editCourse(course: Course) {
    this.router.navigate(['/edit-course', ], { state: { course : course } });
  }

}


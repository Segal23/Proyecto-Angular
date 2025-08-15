import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../shared/entities';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../shared/routes';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule, MatIconModule, MatTooltipModule],
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
    this.router.navigate([`/${RoutePaths.VIEW_COURSE}`, ], { state: { course : course } });
  }

  deleteCourse(course: Course) {
    this.deleteEvent.emit(course);
  }

  editCourse(course: Course) {
    this.router.navigate([`/${RoutePaths.EDIT_COURSE}`, ], { state: { course : course } });
  }

}


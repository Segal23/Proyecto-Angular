import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../shared/entities';
import {MatTableModule} from '@angular/material/table';
import { FullnamePipe } from '../../../shared/pipes/fullname-pipe';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../shared/routes';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, MatIconModule, MatTooltipModule, FullnamePipe, CommonModule],
  templateUrl: './students-table.html',
  styleUrls: ['./students-table.css'],
})
export class StudentsTable {
  @Input() students: Student[] = [];
  @Input() userRole: string | null = null;
  @Output() deleteEvent = new EventEmitter<Student>();
  @Output() editEvent = new EventEmitter<Student>();

  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average', 'actions'];

  constructor(private router: Router) {}

  get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  viewDetails(student: Student) {
    this.router.navigate([`/${RoutePaths.VIEW_STUDENT}`], { state: { student } });
  }

  deleteStudent(student: Student) {
    this.deleteEvent.emit(student);
  }

  editStudent(student: Student) {
    this.router.navigate([`/${RoutePaths.EDIT_STUDENT}`], { state: { student } });
  }
}
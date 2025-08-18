import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Student } from '../../../shared/entities';
import {MatTableModule} from '@angular/material/table';
import { FullnamePipe } from '../../../shared/pipes/fullname-pipe';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../shared/routes';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/auth/auth-service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, MatIconModule, MatTooltipModule, FullnamePipe, CommonModule],
  templateUrl: './students-table.html',
  styleUrls: ['./students-table.css'],
})
export class StudentsTable implements OnDestroy {
  @Input() students: Student[] = [];
  @Output() deleteEvent = new EventEmitter<Student>();
  @Output() editEvent = new EventEmitter<Student>();

  isAdmin: boolean = false;
  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average', 'actions'];

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

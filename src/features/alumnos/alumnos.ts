import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../shared/entities';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { StudentsTable } from './students-table/students-table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, StudentsTable, MatProgressSpinnerModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos {
  alumnos$!: Observable<Student[]>;

  constructor(private AlumnosAPI: AlumnosAPI, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.alumnos$ = this.AlumnosAPI.getAlumnos();
  }

  deleteStudent(student: Student) {
    this.dialog
      .open(ConfirmDialog, {
        data: {
          message: `¿Estás seguro de que deseas eliminar al estudiante ${student.name} ${student.surname}?`,
          title: 'Confirmar acción',
        },
        panelClass: 'custom-dialog-container'
      })
      .afterClosed()
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() => this.AlumnosAPI.deleteAlumno(student)),
        tap(() => {
          this.snackBar.open('Estudiante eliminado correctamente', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        }),
        switchMap(() => this.AlumnosAPI.getAlumnos())
      )
      .subscribe(alumnos => {
        this.alumnos$ = of(alumnos);
      });
  }

  editStudent(student: Student) {
    this.alumnos$ = this.AlumnosAPI.editAlumno(student).pipe(
      switchMap(() => this.AlumnosAPI.getAlumnos())
    );
  }
}

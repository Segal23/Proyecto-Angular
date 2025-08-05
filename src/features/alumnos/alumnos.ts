import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../shared/entities';
import { Observable, switchMap } from 'rxjs';
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

  // deleteStudent(student : Student) {
  //   this.alumnos$ = this.AlumnosAPI.deleteAlumno(student).pipe(
  //     // Actualizar la lista de alumnos después de eliminar uno
  //     switchMap(() => this.AlumnosAPI.getAlumnos())
  //   );
  // }

  async deleteStudent(student: Student) {
    const confirmed = await this.dialog
      .open(ConfirmDialog, {
        data: {
          message: `¿Estás seguro de que deseas eliminar al estudiante ${student.name} ${student.surname}?`,
          title: 'Confirmar acción',
        },
        panelClass: 'custom-dialog-container'
      })
      .afterClosed()
      .toPromise();

    if (confirmed) {
      this.alumnos$ = this.AlumnosAPI.deleteAlumno(student).pipe(
        switchMap(() => {
          this.snackBar.open('Estudiante eliminado correctamente', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          return this.AlumnosAPI.getAlumnos();
        })
      );
    }
  }

  editStudent(student: Student) {
    this.alumnos$ = this.AlumnosAPI.editAlumno(student).pipe(
      // Actualizar la lista de alumnos después de editar uno
      switchMap(() => this.AlumnosAPI.getAlumnos())
    );
  }
}

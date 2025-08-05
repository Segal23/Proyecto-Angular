import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CursosAPI } from './cursos-api';
import { Course } from '../../shared/entities';
import { Observable, switchMap } from 'rxjs';
import { CoursesTable } from "./courses-table/courses-table";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-cursos',
  imports: [CommonModule, CoursesTable, MatProgressSpinnerModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos {
  cursos$!: Observable<Course[]>;

  constructor(private CursosAPI: CursosAPI, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.cursos$ = this.CursosAPI.getCursos();
  }

  // deleteCourse(course : Course) {
  //   console.log('Eliminando curso:', course);
  //   this.cursos$ = this.CursosAPI.deleteCurso(course).pipe(
  //     // Actualizar la lista de alumnos después de eliminar uno
  //     switchMap(() => this.CursosAPI.getCursos())
  //   );
  // }

  async deleteCourse(course: Course) {
    const confirmed = await this.dialog
      .open(ConfirmDialog, {
        data: {
          message: `¿Estás seguro de que deseas eliminar el curso ${course.name}?`,
          title: 'Confirmar acción',
        },
        panelClass: 'custom-dialog-container'
      })
      .afterClosed()
      .toPromise();

    if (confirmed) {
      this.cursos$ = this.CursosAPI.deleteCurso(course).pipe(
        switchMap(() => {
          this.snackBar.open('Curso eliminado correctamente', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          return this.CursosAPI.getCursos();
        })
      );
    }
  }
  
  editCourse(course: Course) {
    this.cursos$ = this.CursosAPI.editCurso(course).pipe(
      // Actualizar la lista de alumnos después de editar uno
      switchMap(() => this.CursosAPI.getCursos())
    );
  }
}

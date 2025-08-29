import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CursosAPI } from './cursos-api';
import { Course } from '../../shared/entities';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
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
  cursos$: Observable<Course[]>;

  constructor(private CursosAPI: CursosAPI, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.cursos$ = this.CursosAPI.getCursos();
  }

  ngOnInit() {
    // La inicialización ya se hace en el constructor
  }

  deleteCourse(course: Course) {
    this.dialog
      .open(ConfirmDialog, {
        data: {
          message: `¿Estás seguro de que deseas eliminar el curso ${course.name}?`,
          title: 'Confirmar acción',
        },
        panelClass: 'custom-dialog-container'
      })
      .afterClosed()
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() => this.CursosAPI.deleteCurso(course)),
        tap(() => {
          this.snackBar.open('Curso eliminado correctamente', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        }),
        switchMap(() => this.CursosAPI.getCursos())
      )
        .subscribe(cursos => {
          this.cursos$ = of(cursos);
        });
  }

  editCourse(course: Course) {
    this.cursos$ = this.CursosAPI.editCurso(course).pipe(
      switchMap(() => this.CursosAPI.getCursos())
    );
  }
}
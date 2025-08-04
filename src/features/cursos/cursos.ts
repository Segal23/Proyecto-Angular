import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CursosAPI } from './cursos-api';
import { Course } from '../../shared/entities';
import { Observable, switchMap } from 'rxjs';
import { CoursesTable } from "./courses-table/courses-table";

@Component({
  selector: 'app-cursos',
  imports: [CommonModule, CoursesTable],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos {
  cursos$!: Observable<Course[]>;

  constructor(private CursosAPI: CursosAPI) {}

  ngOnInit() {
    this.cursos$ = this.CursosAPI.getCursos();
  }

  deleteCourse(course : Course) {
    console.log('Eliminando curso:', course);
    this.cursos$ = this.CursosAPI.deleteCurso(course).pipe(
      // Actualizar la lista de alumnos después de eliminar uno
      switchMap(() => this.CursosAPI.getCursos())
    );
  }

  editCourse(course: Course) {
    this.cursos$ = this.CursosAPI.editCurso(course).pipe(
      // Actualizar la lista de alumnos después de editar uno
      switchMap(() => this.CursosAPI.getCursos())
    );
  }
}

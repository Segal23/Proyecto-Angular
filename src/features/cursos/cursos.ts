import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CursosAPI } from './cursos-api';
import { Course } from '../../shared/entities';
import { Observable } from 'rxjs';
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
}

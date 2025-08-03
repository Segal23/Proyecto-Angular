import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../shared/entities';
import { Observable } from 'rxjs';
import { StudentsTable } from './students-table/students-table';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, StudentsTable],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos {
  alumnos$!: Observable<Student[]>;

  constructor(private AlumnosAPI: AlumnosAPI) {}

  ngOnInit() {
    this.alumnos$ = this.AlumnosAPI.getAlumnos();
  }
}

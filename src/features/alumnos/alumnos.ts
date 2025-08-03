import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../shared/entities';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  imports: [JsonPipe, CommonModule],
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

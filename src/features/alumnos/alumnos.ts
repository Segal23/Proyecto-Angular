import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../shared/entities';

@Component({
  selector: 'app-alumnos',
  imports: [JsonPipe, CommonModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos {

  alumnos! : Student[];

  constructor(private AlumnosAPI: AlumnosAPI) {}

  ngOnInit() {
    this.AlumnosAPI.getAlumnos().subscribe(alumnos => {this.alumnos = alumnos})
  }
}

import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { InscripcionesAPI } from './inscripciones-api';
import { Inscription } from '../../shared/entities';

@Component({
  selector: 'app-inscripciones',
  imports: [JsonPipe, CommonModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones {

  inscripciones! : Inscription[];
  
  constructor(private InscripcionesAPI: InscripcionesAPI) {}
  
  ngOnInit() {
    this.InscripcionesAPI.getInscripciones().subscribe(inscripciones => {this.inscripciones = inscripciones})
  }
}

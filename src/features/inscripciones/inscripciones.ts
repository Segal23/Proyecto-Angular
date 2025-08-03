import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InscripcionesAPI } from './inscripciones-api';
import { Inscription } from '../../shared/entities';
import { Observable } from 'rxjs';
import { InscriptionsTable } from "./inscriptions-table/inscriptions-table";

@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule, InscriptionsTable],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones {

  inscripciones$!: Observable<Inscription[]>;

  constructor(private InscripcionesAPI: InscripcionesAPI) {}

  ngOnInit() {
    this.inscripciones$ = this.InscripcionesAPI.getInscripciones();
  }
}

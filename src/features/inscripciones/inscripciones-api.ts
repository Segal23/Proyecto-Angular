import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Inscription } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesAPI {
  
  baseurl = 'http://localhost:3000';
  constructor(private http :HttpClient) {

  }

  getInscripciones(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.baseurl}/${ApiPaths.INSCRIPTIONS}`).pipe(delay(1000));
  }
}

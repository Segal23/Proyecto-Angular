import { Injectable } from '@angular/core';
import { delay, Observable, catchError } from 'rxjs';
import { Inscription } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../../shared/routes';
import { getHeaders, handleErrors } from '../../shared/http-utils';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesAPI {
  
  baseurl = 'https://689f74e86e38a02c58165e97.mockapi.io/';
  constructor(private http :HttpClient) {

  }

  getInscripciones(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.baseurl}/${ApiPaths.INSCRIPTIONS}`, getHeaders()).pipe(delay(1000))
    .pipe(catchError(handleErrors));
  }

  deleteInscripcion(inscription: Inscription): Observable<void> {
    
    return this.http.delete<void>(`${this.baseurl}/${ApiPaths.INSCRIPTIONS}/${inscription.id}`, getHeaders()).pipe(delay(1000))
    .pipe(catchError(handleErrors));
  }
    
  editInscripcion(inscription : Inscription ): Observable<Inscription> {
    return this.http.put<Inscription>(`${this.baseurl}/${ApiPaths.INSCRIPTIONS}/${inscription.id}`, inscription, getHeaders())
    .pipe(catchError(handleErrors));
  }
}

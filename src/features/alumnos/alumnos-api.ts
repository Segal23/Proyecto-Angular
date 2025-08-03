import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { RoutePaths } from '../../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPI {
  baseurl = 'http://localhost:3000';
  constructor(private http :HttpClient) {

  }

  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseurl}/${RoutePaths.STUDENTS}`).pipe(delay(1000));
  }
}

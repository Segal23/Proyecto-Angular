import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPI {
  baseurl = 'http://localhost:3000';
  constructor(private http :HttpClient) {

  }

  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseurl}/${ApiPaths.STUDENTS}`).pipe(delay(1000));
  }

  deleteAlumno(student: Student): Observable<void> {
    
    return this.http.delete<void>(`${this.baseurl}/${ApiPaths.STUDENTS}/${student.id}`).pipe(delay(1000));
  }
}

import { Injectable } from '@angular/core';
import { delay, Observable, catchError } from 'rxjs';
import { Student } from '../../shared/entities';
import { HttpClient} from '@angular/common/http';
import { ApiPaths } from '../../shared/routes';
import { getHeaders, handleErrors } from '../../shared/http-utils';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPI {
  baseurl = 'https://689f6b4f6e38a02c5816474c.mockapi.io/';
  constructor(private http :HttpClient) {

  }

  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseurl}/${ApiPaths.STUDENTS}`, getHeaders()).pipe(delay(1000))
    .pipe(catchError(handleErrors));
  }

  deleteAlumno(student: Student): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/${ApiPaths.STUDENTS}/${student.id}`, getHeaders())
    .pipe(catchError(handleErrors));
  }

  editAlumno(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseurl}/${ApiPaths.STUDENTS}/${student.id}`, student, getHeaders())
    .pipe(catchError(handleErrors));
  }

}
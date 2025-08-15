import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Course } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class CursosAPI {
  baseurl = 'https://689f6b4f6e38a02c5816474c.mockapi.io/';
  constructor(private http :HttpClient) {

  }

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseurl}/${ApiPaths.COURSES}`).pipe(delay(1000));
  }

  deleteCurso(course: Course): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/${ApiPaths.COURSES}/${course.id}`).pipe(delay(1000));
  }

  editCurso(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseurl}/${ApiPaths.COURSES}/${course.id}`, course);
  }
}

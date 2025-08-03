import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Course } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class CursosAPI {
  baseurl = 'http://localhost:3000';
  constructor(private http :HttpClient) {

  }

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseurl}/${ApiPaths.COURSES}`).pipe(delay(1000));
  }
}

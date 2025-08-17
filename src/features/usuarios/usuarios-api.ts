import { Injectable } from '@angular/core';
import { delay, Observable, catchError } from 'rxjs';
import { User } from '../../shared/entities';
import { HttpClient} from '@angular/common/http';
import { ApiPaths } from '../../shared/routes';
import { getHeaders, handleErrors } from '../../shared/http-utils';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAPI {
  baseurl = 'https://689f74e86e38a02c58165e97.mockapi.io/';
  constructor(private http :HttpClient) {

  }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseurl}/${ApiPaths.USERS}`, getHeaders()).pipe(delay(1000))
    .pipe(catchError(handleErrors));
  }

  deleteUsuario(user: User): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/${ApiPaths.USERS}/${user.id}`, getHeaders())
    .pipe(catchError(handleErrors));
  }

  editUsuario(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseurl}/${ApiPaths.USERS}/${user.id}`, user, getHeaders())
    .pipe(catchError(handleErrors));
  }

}
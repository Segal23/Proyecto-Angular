import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student, Course, Inscription } from '../../shared/entities';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, delay } from 'rxjs/operators';
import { getHeaders, handleErrors } from '../../shared/http-utils';
import { ApiPaths } from '../../shared/routes';

@Injectable({ providedIn: 'root' })
export class InscripcionesAPI {
  private inscriptionsUsersUrl = 'https://689f74e86e38a02c58165e97.mockapi.io';
  private studentsCoursesUrl = 'https://689f6b4f6e38a02c5816474c.mockapi.io';
      
  constructor(private http: HttpClient) {}

  getCursosByStudent(studentDNI: number): Observable<{ course: Course; inscriptionId: number }[]> {
    return this.http.get<Inscription[]>(`${this.inscriptionsUsersUrl}/${ApiPaths.INSCRIPTIONS}`).pipe(
      map(inscripciones => inscripciones.filter(i => i.studentDNI === studentDNI)),
      switchMap(inscripcionesFiltradas => {
        if (inscripcionesFiltradas.length === 0) return of([]);
        const requests: Observable<{ course: Course; inscriptionId: number }>[] = inscripcionesFiltradas.map(i =>
          this.http.get<Course[]>(`${this.studentsCoursesUrl}/${ApiPaths.COURSES}?code=${i.courseCode}`).pipe(
            map(cursos => ({ course: cursos[0], inscriptionId: i.id }))
          )
        );
        return forkJoin(requests);
      }),
      catchError(err => {
        console.error('Error al traer cursos del alumno', err);
        return of([]);
      })
    );
  }

  getStudentsByCourse(courseCode: string): Observable<{ student: Student; inscriptionId: string }[]> {
    return this.http.get<Inscription[]>(`${this.inscriptionsUsersUrl}/${ApiPaths.INSCRIPTIONS}`).pipe(
      map(inscripciones =>
        inscripciones
          .filter(i => i.courseCode === courseCode)
          .map(i => ({ studentDNI: i.studentDNI, inscriptionId: i.id })) 
      ),
      switchMap(studentIds => {
        if (studentIds.length === 0) return of([] as { student: Student; inscriptionId: string }[]);
        const requests: Observable<{ student: Student; inscriptionId: string }>[] = studentIds.map(({ studentDNI, inscriptionId }) =>
          this.http.get<Student[]>(`${this.studentsCoursesUrl}/${ApiPaths.STUDENTS}?dni=${studentDNI}`).pipe(
            map(students => ({ student: students[0], inscriptionId: inscriptionId.toString() })) 
          )
        );
        return forkJoin(requests);
      }),
      catchError(err => {
        console.error('Error al traer alumnos del curso', err);
        return of([] as { student: Student; inscriptionId: string }[]);
      })
    );
  }

  removeStudentFromCourse(inscription: Inscription): Observable<void> {
      return this.http.delete<void>(`${this.inscriptionsUsersUrl}/${ApiPaths.INSCRIPTIONS}/${inscription.id}`, getHeaders())
      .pipe(
      catchError(err => {
        console.error('Error al eliminar inscripción', err);
        throw err;
      })
    );
  }

  getInscripciones(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.inscriptionsUsersUrl}/${ApiPaths.INSCRIPTIONS}`, getHeaders())
      .pipe(delay(1000), catchError(handleErrors));
  }

  deleteInscripcion(inscriptionId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.inscriptionsUsersUrl}/${ApiPaths.INSCRIPTIONS}/${inscriptionId}`,
      getHeaders()
    ).pipe(delay(1000), catchError(handleErrors));
  }

  editInscripcion(inscription: Inscription): Observable<Inscription> {
    return this.http.put<Inscription>(
      `${this.inscriptionsUsersUrl}/${ApiPaths.INSCRIPTIONS}/${inscription.id}`,
      inscription,
      getHeaders()
    ).pipe(catchError(handleErrors));
  }
}

import { Component, OnInit } from '@angular/core';
import { Course, Student } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscripcionesAPI } from '../../inscripciones/inscripciones-api';
import { AuthService } from '../../../core/auth/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Observable, switchMap, tap, catchError, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-view-course',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './view-course.html',
  styleUrls: ['./view-course.css']
})
export class ViewCourse implements OnInit {

  course!: Course;
  viewCourse!: FormGroup;
  alumnos$!: Observable<{ student: Student; inscriptionId: string }[]>;
  role$!: Observable<string | null>;

  displayedColumns: string[] = ['dni', 'name', 'surname', 'age', 'average'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private inscripcionesAPI: InscripcionesAPI,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['course']) {
      this.course = navigation.extras.state['course'];
    }
  }

  ngOnInit() {
    if (!this.course) return;

    this.viewCourse = this.fb.group({
      code: [this.course.code],
      name: [this.course.name],
      credits: [this.course.credits],
      description: [this.course.description],
    });

    this.role$ = this.authService.role$;
    
    // Configurar columnas basado en el rol
    this.role$.subscribe(role => {
      this.displayedColumns = ['dni', 'name', 'surname', 'age', 'average'];
      if (role === 'admin') {
        this.displayedColumns.push('actions');
      }
    });

    this.alumnos$ = this.inscripcionesAPI.getStudentsByCourse(this.course.code);
  }

  removeStudent(studentWithInscription: { student: Student; inscriptionId: string }) {
    this.alumnos$ = this.inscripcionesAPI.deleteInscripcion(studentWithInscription.inscriptionId).pipe(
      tap(() => {
        this.snackBar.open(`Alumno desinscripto: ${studentWithInscription.student.name}`, 'Cerrar', { duration: 2000 });
      }),
      switchMap(() => this.inscripcionesAPI.getStudentsByCourse(this.course.code)),
      catchError(err => {
        this.snackBar.open('Error al desinscribir del curso', 'Cerrar', { duration: 2000 });
        return this.inscripcionesAPI.getStudentsByCourse(this.course.code);
      })
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { Student, Course } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscripcionesAPI } from '../../inscripciones/inscripciones-api';
import { AuthService } from '../../../core/auth/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Observable, of, switchMap, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-student',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatTableModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './view-student.html',
  styleUrls: ['./view-student.css']
})
export class ViewStudent implements OnInit {

  student!: Student;
  viewStudent!: FormGroup;
  cursos$!: Observable<{ course: Course; inscriptionId: number }[]>;
  userRole$: Observable<string | null>;

  displayedColumns: string[] = ['name', 'code', 'credits', 'description'];  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private inscripcionesAPI: InscripcionesAPI,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['student']) {
      this.student = navigation.extras.state['student'];
    }
    this.userRole$ = this.authService.role$;
  }

  ngOnInit() {
    if (!this.student) return;

    this.viewStudent = this.fb.group({
      dni: [this.student.dni],
      name: [this.student.name],
      surname: [this.student.surname],
      age: [this.student.age],
      average: [this.student.average],
    });

    this.cursos$ = this.inscripcionesAPI.getCursosByStudent(this.student.dni);
  }

  removeCourse(cursoConInscripcion: { course: Course; inscriptionId: number }) {
    this.cursos$ = this.inscripcionesAPI.deleteInscripcion(cursoConInscripcion.inscriptionId.toString()).pipe(
      tap(() => {
        this.snackBar.open(`Desinscrito de ${cursoConInscripcion.course.name}`, 'Cerrar', { duration: 2000 });
      }),
      switchMap(() => this.inscripcionesAPI.getCursosByStudent(this.student.dni)),
      tap({
        error: () => {
          this.snackBar.open('Error al desinscribir del curso', 'Cerrar', { duration: 2000 });
        }
      })
    );
  }
}
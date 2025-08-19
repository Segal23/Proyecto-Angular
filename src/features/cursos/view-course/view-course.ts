import { Component, OnInit } from '@angular/core';
import { Course, Student, Inscription } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscripcionesAPI } from '../../inscripciones/inscripciones-api';
import { AuthService } from '../../../core/auth/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-course',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatTableModule],
  templateUrl: './view-course.html',
  styleUrls: ['./view-course.css']
})
export class ViewCourse implements OnInit {

  course!: Course;
  viewCourse!: FormGroup;
  alumnos: { student: Student; inscriptionId: string }[] = [];
  isAdmin = false;

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

  async ngOnInit() {
    if (!this.course) return;

    this.viewCourse = this.fb.group({
      code: [this.course.code],
      name: [this.course.name],
      credits: [this.course.credits],
      description: [this.course.description],
    });

    const role = await firstValueFrom(this.authService.role$);
    this.isAdmin = role === 'admin';
    if (this.isAdmin) this.displayedColumns.push('actions');

    this.inscripcionesAPI.getStudentsByCourse(this.course.code).subscribe(alumnos => {
      this.alumnos = alumnos;
    });
  }

  async removeStudent(studentWithInscription: { student: Student; inscriptionId: string }) {
    try {
      await firstValueFrom(
        this.inscripcionesAPI.deleteInscripcion(studentWithInscription.inscriptionId)
      );
      this.alumnos = this.alumnos.filter(a => a.inscriptionId !== studentWithInscription.inscriptionId);
      this.snackBar.open(`Alumno desinscripto: ${studentWithInscription.student.name}`, 'Cerrar', { duration: 2000 });
    } catch (err) {
      this.snackBar.open('Error al desinscribir del curso', 'Cerrar', { duration: 2000 });
    }
  }  
}

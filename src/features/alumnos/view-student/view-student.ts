import { Component, OnInit } from '@angular/core';
import { Student, Course, Inscription } from '../../../shared/entities';
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
  selector: 'app-view-student',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatTableModule],
  templateUrl: './view-student.html',
  styleUrls: ['./view-student.css']
})
export class ViewStudent implements OnInit {

  student!: Student;
  viewStudent!: FormGroup;
  cursos: { course: Course; inscriptionId: number }[] = [];
  isAdmin = false;

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
  }

  async ngOnInit() {
    if (!this.student) return;

    this.viewStudent = this.fb.group({
      dni: [this.student.dni],
      name: [this.student.name],
      surname: [this.student.surname],
      age: [this.student.age],
      average: [this.student.average],
    });

    const role = await firstValueFrom(this.authService.role$);
    this.isAdmin = role === 'admin';
    if (this.isAdmin) this.displayedColumns.push('actions');

    this.inscripcionesAPI.getCursosByStudent(this.student.dni).subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  async removeCourse(cursoConInscripcion: { course: Course; inscriptionId: number }) {
    try {
      await firstValueFrom(
        this.inscripcionesAPI.deleteInscripcion(cursoConInscripcion.inscriptionId.toString())
      );
      this.cursos = this.cursos.filter(c => c.inscriptionId !== cursoConInscripcion.inscriptionId);
      this.snackBar.open(`Desinscrito de ${cursoConInscripcion.course.name}`, 'Cerrar', { duration: 2000 });
    } catch (err) {
      this.snackBar.open('Error al desinscribir del curso', 'Cerrar', { duration: 2000 });
    }
  }
}

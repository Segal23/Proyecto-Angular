import { Component } from '@angular/core';
import { Course } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CursosAPI } from '../cursos-api';
import { RoutePaths } from '../../../shared/routes';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-course',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css'
})

export class EditCourse {
  course: Course | undefined;
  editCourse!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private cursosApi: CursosAPI, private snackBar: MatSnackBar) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.course = navigation.extras.state['course'];
    }
  }

  ngOnInit() {
    this.editCourse = this.fb.group({
      name: [this.course?.name || '', Validators.required],
      code: [this.course?.code || '', Validators.required],
      credits: [this.course?.credits || '', Validators.required],
      description: [this.course?.description || 0, Validators.required]
    });
  }

  async onSubmit() {
      if (this.editCourse.invalid || !this.course?.id) return;
    
      const updatedCourse: Course = {
        id: this.course.id,
        ...this.editCourse.value,
      };
    
      try {
        await firstValueFrom(this.cursosApi.editCurso(updatedCourse));
        const snackBarRef = this.snackBar.open(
          'Curso actualizado con éxito ✅',
          'Cerrar', {
            duration: 2000,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          }
        );
        await firstValueFrom(snackBarRef.afterDismissed());
        this.router.navigate([`/${RoutePaths.CURSOS}`]);
      } catch (error) {
        this.snackBar.open('Error al actualizar el curso ❌', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }
    }
}
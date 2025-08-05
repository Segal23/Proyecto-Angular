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
      credits: [this.course?.credits || 0, [Validators.required, Validators.min(1), Validators.max(10)]],
      description: [this.course?.description || '', Validators.required]
    });
  }

  async onSubmit() {
    if (!this.course?.id || !this.validarCampos()) return;
    
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

    mostrarError(mensaje: string) {
      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  
    validarCampos(): boolean {
      for (const campo in this.editCourse.controls) {
        const control = this.editCourse.get(campo);
    
        if (control && control.invalid) {
          const nombreCampo = this.getNombreCampo(campo);
    
          if (control.errors?.['required']) {
            this.mostrarError(`El campo '${nombreCampo}' es obligatorio.`);
            return false;
          }
    
          if (control.errors?.['minlength']) {
            const min = control.errors['minlength'].requiredLength;
            this.mostrarError(`El campo '${nombreCampo}' debe tener al menos ${min} caracteres.`);
            return false;
          }
    
          if (control.errors?.['maxlength']) {
            const max = control.errors['maxlength'].requiredLength;
            this.mostrarError(`El campo '${nombreCampo}' debe tener como máximo ${max} caracteres.`);
            return false;
          }
    
          if (control.errors?.['min']) {
            const min = control.errors['min'].min;
            this.mostrarError(`El campo '${nombreCampo}' no puede ser menor que ${min}.`);
            return false;
          }
    
          if (control.errors?.['max']) {
            const max = control.errors['max'].max;
            this.mostrarError(`El campo '${nombreCampo}' no puede ser mayor que ${max}.`);
            return false;
          }
    
          if (control.errors?.['notInteger']) {
            this.mostrarError(`El campo '${nombreCampo}' debe ser un número entero.`);
            return false;
          }
        }
      }
      return true;
    }
  
    getNombreCampo(campo: string): string {
      const nombres: { [key: string]: string } = {
        name: 'Nombre',
        code: 'Código',
        credits: 'Créditos',
        description: 'Descripción'
      };
      return nombres[campo] || campo;
    }
}
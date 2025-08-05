import { Component } from '@angular/core';
import { Student } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlumnosAPI } from '../alumnos-api';
import { RoutePaths } from '../../../shared/routes';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-student',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.css'
})

export class EditStudent {

  student: Student | undefined;
  editStudent!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private alumnosApi: AlumnosAPI, private snackBar: MatSnackBar) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.student = navigation.extras.state['student'];
    }
  }

  ngOnInit() {
    this.editStudent = this.fb.group({
      dni: [this.student?.dni || '', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      name: [this.student?.name || '', Validators.required],
      surname: [this.student?.surname || '', Validators.required],
      age: [this.student?.age || 0, Validators.required],
      average: [this.student?.average || 0, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  async onSubmit() {
    if (!this.student?.id || !this.validarCampos()) return;
      
    const updatedStudent: Student = {
      id: this.student.id,
      dni: this.student.dni,
      ...this.editStudent.value,
    };
    
    try {
      await firstValueFrom(this.alumnosApi.editAlumno(updatedStudent));
      const snackBarRef = this.snackBar.open(
        'Estudiante actualizado con éxito ✅',
        'Cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        }
      );
      await firstValueFrom(snackBarRef.afterDismissed());
      this.router.navigate([`/${RoutePaths.ALUMNOS}`]);
    } catch (error) {
      this.snackBar.open('Error al actualizar el estudiante ❌', 'Cerrar', {
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
    for (const campo in this.editStudent.controls) {
      const control = this.editStudent.get(campo);
      // control?.markAsTouched();  // Marca como tocado para que Angular detecte el error internamente
  
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
      surname: 'Apellido',
      dni: 'DNI',
      age: 'Edad',
      average: 'Promedio'
    };
    return nombres[campo] || campo;
  }
}
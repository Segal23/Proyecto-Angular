import { Component } from '@angular/core';
import { Inscription } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscripcionesAPI } from '../inscripciones-api';
import { RoutePaths } from '../../../shared/routes';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-inscription',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-inscription.html',
  styleUrl: './edit-inscription.css'
})

export class EditInscription {

  inscription: Inscription | undefined;
  editInscription!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private inscripcionesApi: InscripcionesAPI, private snackBar: MatSnackBar) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.inscription = navigation.extras.state['inscription'];
    }
  }

  ngOnInit() {
    this.editInscription = this.fb.group({
      studentDNI: [this.inscription?.studentDNI || '', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      courseCode: [this.inscription?.courseCode || '', Validators.required],
      grade: [this.inscription?.grade || 0, [Validators.required, Validators.min(1), Validators.max(10)]],
      status: [this.inscription?.status || '', Validators.required]
    });
  }
  
  async onSubmit() {
    if (!this.inscription?.id || !this.validarCampos()) return;
  
    const updatedInscription: Inscription = {
      id: this.inscription.id,
      ...this.editInscription.value,
    };
  
    try {
      await firstValueFrom(this.inscripcionesApi.editInscripcion(updatedInscription));
      const snackBarRef = this.snackBar.open(
        'Inscripción actualizada con éxito ✅',
        'Cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        }
      );
      await firstValueFrom(snackBarRef.afterDismissed());
      this.router.navigate([`/${RoutePaths.INSCRIPCIONES}`]);
    } catch (error) {
      this.snackBar.open('Error al actualizar la inscripción ❌', 'Cerrar', {
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
    for (const campo in this.editInscription.controls) {
      const control = this.editInscription.get(campo);
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
      studentDNI: 'DNI Alumno',
      courseCode: 'Código Curso',
      grade: 'Grado',
      status: 'Estado'
    };
    return nombres[campo] || campo;
  }
}

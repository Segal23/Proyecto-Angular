import { Component } from '@angular/core';
import { User } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuariosAPI } from '../usuarios-api';
import { RoutePaths } from '../../../shared/routes';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})

export class EditUser {

  user: User | undefined;
  editUser!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private usuariosAPI: UsuariosAPI, private snackBar: MatSnackBar) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'];
    }
  }

  ngOnInit() {
    this.editUser = this.fb.group({
      dni: [this.user?.dni || '', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      name: [this.user?.name || '', Validators.required],
      surname: [this.user?.surname || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      username: [this.user?.username || '', [
        Validators.required, 
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: [this.user?.password || '', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]],
      role: [this.user?.role || '', [Validators.required]],
      isActive: [this.user?.isActive ?? false, [Validators.required]],
      createdAt: [this.user?.createdAt || '', [Validators.required]]
    });
  }

  async onSubmit() {
    if (!this.user?.id || !this.validarCampos()) return;
      
    const updatedUser: User = {
      id: this.user.id,
      dni: this.user.dni,
      ...this.editUser.value,
    };
    
    try {
      console.log(updatedUser);
      await firstValueFrom(this.usuariosAPI.editUsuario(updatedUser));
      const snackBarRef = this.snackBar.open(
        'Usuario actualizado con éxito ✅',
        'Cerrar', {
          duration: 2000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        }
      );
      await firstValueFrom(snackBarRef.afterDismissed());
      this.router.navigate([`/${RoutePaths.USUARIOS}`]);
    } catch (error) {
      this.snackBar.open('Error al actualizar el usurio ❌', 'Cerrar', {
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
    for (const campo in this.editUser.controls) {
      const control = this.editUser.get(campo);
  
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

        if (control.errors?.['email']) {
          this.mostrarError(`El campo '${nombreCampo}' tiene un formato inválido.`);
          return false;
        }

        if (control.errors?.['pattern']) {
          if(campo ==='username' ){
            this.mostrarError(`El campo '${nombreCampo}' solo puede contener letras y números.`);
          }
          if(campo ==='password' ){
            this.mostrarError(`El campo '${nombreCampo}' debe tener mayúscula, minúscula, número y un carácter especial.`);
          }
          return false;
        }
      }
    }
    return true;
  }
  
  getNombreCampo(campo: string): string {
    const nombres: { [key: string]: string } = {
      dni: 'DNI',
      name: 'Nombre',
      surname: 'Apellido',
      email: "Correo electrónico",
      username: 'Usuario',
      password: 'Password',
      role: "Rol",
      isActive: "Activo",
      createdAt: "Creado"
    };
    return nombres[campo] || campo;
  }
}
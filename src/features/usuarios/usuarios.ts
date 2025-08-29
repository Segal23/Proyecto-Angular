import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsuariosAPI } from './usuarios-api';
import { User } from '../../shared/entities';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { UsersTable } from './users-table/users-table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, UsersTable, MatProgressSpinnerModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {
  usuarios$: Observable<User[]>;

  constructor(private UsuariosAPI: UsuariosAPI, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.usuarios$ = this.UsuariosAPI.getUsuarios();
  }

  ngOnInit() {
    // La inicialización ya se hace en el constructor
  }

  deleteUser(user: User) {
    this.dialog
      .open(ConfirmDialog, {
        data: {
          message: `¿Estás seguro que deseas eliminar al usuario ${user.name} ${user.surname}?`,
          title: 'Confirmar acción',
        },
        panelClass: 'custom-dialog-container'
      })
      .afterClosed()
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() => this.UsuariosAPI.deleteUsuario(user)),
        tap(() => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        }),
        switchMap(() => this.UsuariosAPI.getUsuarios())
      )
      .subscribe(usuarios => {
        this.usuarios$ = of(usuarios);
      });
  }

  editUser(user: User) {
    this.usuarios$ = this.UsuariosAPI.editUsuario(user).pipe(
      switchMap(() => this.UsuariosAPI.getUsuarios())
    );
  }
}
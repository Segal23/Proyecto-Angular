import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InscripcionesAPI } from './inscripciones-api';
import { Inscription } from '../../shared/entities';
import { Observable, switchMap } from 'rxjs';
import { InscriptionsTable } from "./inscriptions-table/inscriptions-table";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule, InscriptionsTable],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones {

  inscripciones$!: Observable<Inscription[]>;

  constructor(private InscripcionesAPI: InscripcionesAPI, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.inscripciones$ = this.InscripcionesAPI.getInscripciones();
  }

  // deleteInscription(inscription : Inscription) {
  //   this.inscripciones$ = this.InscripcionesAPI.deleteInscripcion(inscription).pipe(
  //     switchMap(() => this.InscripcionesAPI.getInscripciones())
  //   );
  // }

  async deleteInscription(inscription: Inscription) {
    const confirmed = await this.dialog
      .open(ConfirmDialog, {
        data: {
          message: `¿Estás seguro de que desea eliminar la inscripción del DNI: ${inscription.studentDNI} y código de curso: ${inscription.courseCode}?`,
          title: 'Confirmar acción',
        },
        panelClass: 'custom-dialog-container'
      })
      .afterClosed()
      .toPromise();

    if (confirmed) {
      this.inscripciones$ = this.InscripcionesAPI.deleteInscripcion(inscription).pipe(
        switchMap(() => {
          this.snackBar.open('Inscripción eliminada correctamente', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          return this.InscripcionesAPI.getInscripciones();
        })
      );
    }
  }

  editInscription(inscription : Inscription) {
    this.inscripciones$ = this.InscripcionesAPI.editInscripcion(inscription).pipe(
      switchMap(() => this.InscripcionesAPI.getInscripciones())
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InscripcionesAPI } from './inscripciones-api';
import { Inscription } from '../../shared/entities';
import { filter, Observable, of, switchMap, tap } from 'rxjs';
import { InscriptionsTable } from "./inscriptions-table/inscriptions-table";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-inscripciones',
  imports: [CommonModule, InscriptionsTable, MatProgressSpinnerModule],
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones {

  inscripciones$!: Observable<Inscription[]>;

  constructor(private InscripcionesAPI: InscripcionesAPI, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.inscripciones$ = this.InscripcionesAPI.getInscripciones();
  }

  deleteStudent(inscription: Inscription) {
      this.dialog
        .open(ConfirmDialog, {
          data: {
            message: `¿Estás seguro de que desea eliminar la inscripción del DNI: ${inscription.studentDNI}?`,
            title: 'Confirmar acción',
          },
          panelClass: 'custom-dialog-container'
        })
        .afterClosed()
        .pipe(
          filter(confirmed => confirmed),
          switchMap(() => this.InscripcionesAPI.deleteInscripcion(inscription)),
          tap(() => {
            this.snackBar.open('Inscripción eliminada correctamente', 'Cerrar', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
          }),
          switchMap(() => this.InscripcionesAPI.getInscripciones())
        )
        .subscribe(inscripciones => {
          this.inscripciones$ = of(inscripciones);
        });
    }

  editInscription(inscription : Inscription) {
    this.inscripciones$ = this.InscripcionesAPI.editInscripcion(inscription).pipe(
      switchMap(() => this.InscripcionesAPI.getInscripciones())
    );
  }
}

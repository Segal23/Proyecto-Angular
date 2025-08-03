import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-delete-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.css'
})

export class DeleteForm implements OnInit {

  private _snackBar = inject(MatSnackBar);
  
  studentForm!: FormGroup

  @Input() studentDeleted!: (dni: string) => boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void { 
    this.studentForm = this.fb.group ({
      dni: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onDelete() {
    if (this.studentForm.valid) {
      const { dni } = this.studentForm.value;
      const deleted = this.studentDeleted(dni.toString());
  
      this.showFeedback(deleted);
      this.studentForm.reset();
    }
  }
  
  showFeedback(success: boolean) {
    const message = success
      ? 'Estudiante eliminado correctamente'
      : 'No se encontró el estudiante con ese DNI';
    const action = 'Cerrar';
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
  }
}
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../shared/entities';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css'
})
export class AddForm implements OnInit {

  studentForm!: FormGroup;

  private _snackBar = inject(MatSnackBar);

  @Output() studentAdded = new EventEmitter<Student>();

  constructor(private fb: FormBuilder) {};

  ngOnInit() {    
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      average: [
      '', [Validators.required, Validators.min(0), Validators.max(10)],
        ],
      
    });
  }

  onSubmit() {
    const formValue = this.studentForm.value;
  
    const newStudent: Student = {
      ...formValue,
      dni: Number(formValue.dni),
      age: Number(formValue.age),
      average: Number(formValue.average),
    };
  
    this.studentAdded.emit(newStudent);
    this._snackBar.open('Estudiante agregado correctamente', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.studentForm.reset();
  }

  onReset() {
    this.studentForm.reset();
  }
}

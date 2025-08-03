import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../shared/entities';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.html',
  styleUrls: ['./edit-form.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ]
})

export class EditForm implements OnInit, OnChanges {
  @Input() students: Student[] = [];
  @Output() studentUpdated = new EventEmitter<Student>();

  searchForm!: FormGroup;
  editForm!: FormGroup;

  studentFound: boolean = false;
  private _snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      this.searchForm = this.fb.group({
      dni: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      average: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });

    this.studentFound = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['students'] && this.students.length > 0) {
    }
  }

  onSearch() {
    if (this.searchForm.valid) {
      const dni = Number(this.searchForm.value.dni);
      const student = this.students.find(s => s.dni === dni);
      if (student) {
        this.editForm.patchValue({
          dni: student.dni,
          name: student.name,
          surname: student.surname,
          age: student.age,
          average: student.average,
        });
        this.studentFound = true;
      } else {
        this._snackBar.open('Estudiante no encontrado', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.editForm.reset();
        this.studentFound = false;
      }
    }
  }  

  onUpdate() {
    if (this.editForm.valid) {
      const updated: Student = {
        dni: Number(this.editForm.value.dni),
        name: this.editForm.value.name,
        surname: this.editForm.value.surname,
        age: Number(this.editForm.value.age),
        average: Number(this.editForm.value.average),
      };
  
      this.studentUpdated.emit(updated);
  
      this._snackBar.open('Estudiante modificado correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.editForm.reset();
      this.searchForm.reset();
      this.studentFound = false;
    } else {
      this._snackBar.open('Complete todos los campos correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }  
}

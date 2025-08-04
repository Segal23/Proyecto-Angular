import { Component } from '@angular/core';
import { Student } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlumnosAPI } from '../alumnos-api';
import { RoutePaths } from '../../../shared/routes';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.css'
})

export class EditStudent {

  student: Student | undefined;
  editStudent!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private alumnosApi: AlumnosAPI) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.student = navigation.extras.state['student'];
    }
  }

  ngOnInit() {
    this.editStudent = this.fb.group({
      dni: [this.student?.dni || '', Validators.required],
      name: [this.student?.name || '', Validators.required],
      surname: [this.student?.surname || '', Validators.required],
      age: [this.student?.age || 0, Validators.required],
      average: [this.student?.average || 0, Validators.required],
    });
  }

  async onSubmit() {
      if (this.editStudent.invalid || !this.student?.id) return;
    
      const updatedStudent: Student = {
        id: this.student.id,
        dni: this.student.dni,
        ...this.editStudent.value,
      };
    
      try {
        await firstValueFrom(this.alumnosApi.editAlumno(updatedStudent));
        this.router.navigate([`/${RoutePaths.ALUMNOS}`]);
      } catch (error) {
        console.error('Error al actualizar el alumno', error);
      }
    }
}
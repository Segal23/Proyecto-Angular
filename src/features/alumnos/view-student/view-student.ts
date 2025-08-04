import { Component } from '@angular/core';
import { Student } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-student',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './view-student.html',
  styleUrl: './view-student.css'
})
export class ViewStudent {

  student: Student | undefined;
  viewStudent!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.student = navigation.extras.state['student'];
    }
  }

  ngOnInit() {
    this.viewStudent = this.fb.group({
      dni: [this.student?.dni],
      name: [this.student?.name],
      surname: [this.student?.surname],
      age: [this.student?.age],
      average: [this.student?.average],
    });
  }
} 
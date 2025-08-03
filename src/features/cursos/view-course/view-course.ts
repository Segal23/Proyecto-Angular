import { Component } from '@angular/core';
import { Course } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-course',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './view-course.html',
  styleUrl: './view-course.css'
})
export class ViewCourse {

  course: Course | undefined;
  viewCourse!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.course = navigation.extras.state['course'];
    }
  }

  ngOnInit() {
    this.viewCourse = this.fb.group({
      name: [this.course?.name || '', Validators.required],
      code: [this.course?.code || '', Validators.required],
      credits: [this.course?.credits || '', Validators.required],
      description: [this.course?.description || 0, Validators.required],
    });
  }
}
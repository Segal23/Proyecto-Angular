import { Component } from '@angular/core';
import { Inscription } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-inscription',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './view-inscription.html',
  styleUrl: './view-inscription.css'
})
export class ViewInscription {

  inscription: Inscription | undefined;
  viewInscription!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.inscription = navigation.extras.state['inscription'];
    }
  }

  ngOnInit() {
    this.viewInscription = this.fb.group({
      studentDNI: [this.inscription?.studentDNI || '', Validators.required],
      courseCode: [this.inscription?.courseCode || '', Validators.required],
      grade: [this.inscription?.grade || '', Validators.required],
      status: [this.inscription?.status || 0, Validators.required]
    });
  }
}
import { Component } from '@angular/core';
import { User } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-view-user',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule],
  templateUrl: './view-user.html',
  styleUrl: './view-user.css'
})
export class ViewUser {

  user: User | undefined;
  viewUser!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['user'];
    }
  } 

  ngOnInit() {
    this.viewUser = this.fb.group({
      dni: [this.user?.dni],
      name: [this.user?.name],
      surname: [this.user?.surname],
      email: [this.user?.email],
      username: [this.user?.username],
      password: [this.user?.password],
      role: [this.user?.role] ,
      isActive: [this.user?.isActive] ,
      createdAt: [this.user?.createdAt] ,
    });
  }
} 
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../features/navbar/navbar';
import { Toolbar } from '../features/toolbar/toolbar';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../features/alumnos/students-table/students-table';
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatDialogModule,
    MatSnackBarModule,
  ]
})
export class AppModule {}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toolbar, CommonModule, MatInputModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  students: Student[] = [];

  activeSection = "students";

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

}
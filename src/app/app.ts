import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Toolbar } from './toolbar/toolbar';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from './students-table/students-table';
import { AddForm } from "./add-form/add-form";
import { DeleteForm } from './delete-form/delete-form';
import { MatInputModule } from "@angular/material/input";
import { EditForm } from './edit-form/edit-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toolbar, CommonModule, StudentsTable, AddForm, DeleteForm, EditForm, MatInputModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  students: Student[] = [];

  activeSection = "students";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Student[]>('mocks/students.json').subscribe(data => {
      this.students = data;
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  addStudent(student: Student) {
    this.students = [...this.students, student];
  }

  deleteStudent(dni: string): boolean {
    const index = this.students.findIndex(student => student.dni.toString() === dni);
    if (index !== -1) {
      this.students.splice(index, 1);
      return true;
    }
    return false;
  }

  updateStudent(updated: Student) {
    const updatedDni = typeof updated.dni === 'string' ? Number(updated.dni) : updated.dni;
    const index = this.students.findIndex(s => s.dni === updatedDni);
    if (index !== -1) {
      updated.dni = updatedDni;
      this.students[index] = updated;
      this.students = [...this.students]; 
      console.log('Estudiante actualizado:', updated);
    } else {
      console.warn('No se encontró estudiante para actualizar con DNI:', updatedDni);
    }
  }
  
}

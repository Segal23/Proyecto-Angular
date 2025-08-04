import { Component } from '@angular/core';
import { Inscription } from '../../../shared/entities';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscripcionesAPI } from '../inscripciones-api';
import { RoutePaths } from '../../../shared/routes';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-inscription',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-inscription.html',
  styleUrl: './edit-inscription.css'
})

export class EditInscription {

  inscription: Inscription | undefined;
  editInscription!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private inscripcionesApi: InscripcionesAPI) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.inscription = navigation.extras.state['inscription'];
    }
  }

  ngOnInit() {
    this.editInscription = this.fb.group({
      studentDNI: [this.inscription?.studentDNI || '', Validators.required],
      courseCode: [this.inscription?.courseCode || '', Validators.required],
      grade: [this.inscription?.grade || '', Validators.required],
      status: [this.inscription?.status || 0, Validators.required]
    });
  }
  
  async onSubmit() {
    if (this.editInscription.invalid || !this.inscription?.id) return;
  
    const updatedInscription: Inscription = {
      id: this.inscription.id,
      ...this.editInscription.value,
    };
  
    try {
      await firstValueFrom(this.inscripcionesApi.editInscripcion(updatedInscription));
      this.router.navigate([`/${RoutePaths.INSCRIPCIONES}`]);
    } catch (error) {
      console.error('Error al actualizar la inscripción', error);
    }
  }
}

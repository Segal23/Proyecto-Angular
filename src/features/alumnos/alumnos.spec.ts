import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Alumnos } from './alumnos';
import { AlumnosAPI } from './alumnos-api';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../../shared/entities';

describe('Alumnos Component', () => {
  let component: Alumnos;
  let fixture: ComponentFixture<Alumnos>;
  let alumnosServiceMock: any;
  let dialogMock: any;
  let snackBarMock: any;

  beforeEach(async () => {
    alumnosServiceMock = {
      getAlumnos: jasmine.createSpy('getAlumnos').and.returnValue(of([])),
      deleteAlumno: jasmine.createSpy('deleteAlumno').and.returnValue(of(void 0)),
      editAlumno: jasmine.createSpy('editAlumno').and.returnValue(of({}))
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true)
      })
    };

    snackBarMock = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      imports: [Alumnos],
      providers: [
        { provide: AlumnosAPI, useValue: alumnosServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Alumnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch alumnos on init', () => {
    expect(alumnosServiceMock.getAlumnos).toHaveBeenCalled();
  });

  it('should call deleteAlumno when deleteStudent is triggered', () => {
    const student = { id: '1', name: 'Juan', surname: 'Perez' };
    component.deleteStudent(student as any);
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should call editAlumno when editStudent is triggered', () => {
    const student = { id: 1, name: 'Juan', surname: 'Perez', dni: 12345678, age: 20, average: 8.5 };
    component.editStudent(student as any);
    expect(alumnosServiceMock.editAlumno).toHaveBeenCalledWith(student);
  });

  it('alumnos$ should emit Student array with correct types', (done) => {
    const dummyAlumnos: Student[] = [
      { id: 1, name: 'Juan', surname: 'Perez', dni: 12345678, age: 20, average: 8.5 },
      { id: 2, name: 'Ana', surname: 'Gomez', dni: 87654321, age: 22, average: 9.0 }
    ];
    
    alumnosServiceMock.getAlumnos.and.returnValue(of(dummyAlumnos));
  
    component.ngOnInit();
  
    component.alumnos$.subscribe(alumnos => {
      expect(Array.isArray(alumnos)).toBeTrue();
      alumnos.forEach(a => {
        expect(typeof a.id).toBe('number');
        expect(typeof a.name).toBe('string');
        expect(typeof a.surname).toBe('string');
      });
      done();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../shared/entities';
import { ApiPaths } from '../../shared/routes';

describe('AlumnosAPI', () => {
  let service: AlumnosAPI;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlumnosAPI]
    });

    service = TestBed.inject(AlumnosAPI);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch alumnos', () => {
    const dummyAlumnos: Student[] = [
      { id: 1, name: 'Juan', surname: 'Perez', dni: 12345678, age: 20, average: 8.5 },
      { id: 2, name: 'Ana', surname: 'Gomez', dni: 87654321, age: 22, average: 9.0 }
    ];

    service.getAlumnos().subscribe(alumnos => {
      expect(alumnos.length).toBe(2);
      expect(alumnos).toEqual(dummyAlumnos);
    });

    const req = httpMock.expectOne(`${service.baseurl}/${ApiPaths.STUDENTS}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAlumnos); // respondemos con los datos de prueba
  });

  it('should delete alumno', () => {
    const student: Student = { id: 1, name: 'Juan', surname: 'Perez', dni: 12345678, age: 20, average: 8.5 };

    service.deleteAlumno(student).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.baseurl}/${ApiPaths.STUDENTS}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should edit alumno', () => {
    const student: Student = { id: 1, name: 'Juan', surname: 'Perez', dni: 12345678, age: 25, average: 8.5 };

    service.editAlumno(student).subscribe(updated => {
      expect(updated).toEqual(student);
    });

    const req = httpMock.expectOne(`${service.baseurl}/${ApiPaths.STUDENTS}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(student);
  });

  it('should return an array of Student objects', () => {
    const dummyAlumnos: Student[] = [
      { id: 1, name: 'Juan', surname: 'Perez', dni: 12345678, age: 20, average: 8.5 },
      { id: 2, name: 'Ana', surname: 'Gomez', dni: 87654321, age: 22, average: 9.0 }
    ];
  
    service.getAlumnos().subscribe(alumnos => {
      expect(Array.isArray(alumnos)).toBeTrue();
  
      alumnos.forEach(a => {
        expect(typeof a.id).toBe('number');
        expect(typeof a.name).toBe('string');
        expect(typeof a.surname).toBe('string');
      });
    });
  
    const req = httpMock.expectOne(`${service.baseurl}/${ApiPaths.STUDENTS}`);
    req.flush(dummyAlumnos);
  });
});

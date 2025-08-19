import { TestBed } from '@angular/core/testing';
import { AlumnosAPI } from './alumnos-api';
import { of } from 'rxjs';
import { Student } from '../../shared/entities';

describe('AlumnosAPI', () => {
  let api: AlumnosAPI;
  let apiSpy: jasmine.SpyObj<AlumnosAPI>;

  const mockStudents: Student[] = [
    { id: 1, dni: 12345678, name: 'Juan', surname: 'Pérez', age: 20, average: 8 },
    { id: 2, dni: 87654321, name: 'Luis', surname: 'Martínez', age: 23, average: 7.5 }
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AlumnosAPI', ['getAlumnos', 'editAlumno', 'deleteAlumno']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AlumnosAPI, useValue: spy }
      ]
    });

    apiSpy = TestBed.inject(AlumnosAPI) as jasmine.SpyObj<AlumnosAPI>;
    api = apiSpy;
  });

  it('should be created', () => {
    expect(api).toBeTruthy();
  });

  it('should fetch all students', (done: DoneFn) => {
    apiSpy.getAlumnos.and.returnValue(of(mockStudents));

    api.getAlumnos().subscribe(students => {
      expect(students).toEqual(mockStudents);
      expect(students.length).toBe(2);
      done();
    });

    expect(apiSpy.getAlumnos).toHaveBeenCalled();
  });

  it('should edit a student', (done: DoneFn) => {
    const editedStudent: Student = { ...mockStudents[0], name: 'Juanito' };
    apiSpy.editAlumno.and.returnValue(of(editedStudent));

    api.editAlumno(editedStudent).subscribe(student => {
      expect(student.name).toBe('Juanito');
      done();
    });

    expect(apiSpy.editAlumno).toHaveBeenCalledWith(editedStudent);
  });

  it('should delete a student', (done: DoneFn) => {
    const studentToDelete = mockStudents[1];
    apiSpy.deleteAlumno.and.returnValue(of(void 0));

    api.deleteAlumno(studentToDelete).subscribe(result => {
      expect(result).toBeUndefined();
      done();
    });

    expect(apiSpy.deleteAlumno).toHaveBeenCalledWith(studentToDelete);
  });
});

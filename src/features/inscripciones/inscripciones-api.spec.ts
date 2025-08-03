import { TestBed } from '@angular/core/testing';

import { InscripcionesAPI } from './inscripciones-api';

describe('InscripcionesAPI', () => {
  let service: InscripcionesAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionesAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

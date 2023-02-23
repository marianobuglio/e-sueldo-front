import { TestBed } from '@angular/core/testing';

import { CalificacionResolver } from './calificacion.resolver';

describe('CalificacionResolver', () => {
  let resolver: CalificacionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CalificacionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

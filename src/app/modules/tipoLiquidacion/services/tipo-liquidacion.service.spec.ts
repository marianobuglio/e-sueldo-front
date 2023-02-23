import { TestBed } from '@angular/core/testing';

import { TipoLiquidacionService } from './tipo-liquidacion.service';

describe('TipoLiquidacionService', () => {
  let service: TipoLiquidacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoLiquidacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

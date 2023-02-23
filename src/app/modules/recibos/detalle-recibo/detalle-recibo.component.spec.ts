import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReciboComponent } from './detalle-recibo.component';

describe('DetalleReciboComponent', () => {
  let component: DetalleReciboComponent;
  let fixture: ComponentFixture<DetalleReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleReciboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

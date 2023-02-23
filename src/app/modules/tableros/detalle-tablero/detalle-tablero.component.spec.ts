import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTableroComponent } from './detalle-tablero.component';

describe('DetalleTableroComponent', () => {
  let component: DetalleTableroComponent;
  let fixture: ComponentFixture<DetalleTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleTableroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

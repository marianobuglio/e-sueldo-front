import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirRecibosComponent } from './subir-recibos.component';

describe('SubirRecibosComponent', () => {
  let component: SubirRecibosComponent;
  let fixture: ComponentFixture<SubirRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirRecibosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

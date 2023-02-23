import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReciboComponent } from './modal-recibo.component';

describe('ModalReciboComponent', () => {
  let component: ModalReciboComponent;
  let fixture: ComponentFixture<ModalReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReciboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

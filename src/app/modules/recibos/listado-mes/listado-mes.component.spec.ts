import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMesComponent } from './listado-mes.component';

describe('ListadoMesComponent', () => {
  let component: ListadoMesComponent;
  let fixture: ComponentFixture<ListadoMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

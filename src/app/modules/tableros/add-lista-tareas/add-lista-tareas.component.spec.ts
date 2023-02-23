import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListaTareasComponent } from './add-lista-tareas.component';

describe('AddListaTareasComponent', () => {
  let component: AddListaTareasComponent;
  let fixture: ComponentFixture<AddListaTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListaTareasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

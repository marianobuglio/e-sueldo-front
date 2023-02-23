import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntegrantesComponent } from './add-integrantes.component';

describe('AddIntegrantesComponent', () => {
  let component: AddIntegrantesComponent;
  let fixture: ComponentFixture<AddIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIntegrantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

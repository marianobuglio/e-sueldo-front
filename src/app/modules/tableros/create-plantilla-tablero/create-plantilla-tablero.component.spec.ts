import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlantillaTableroComponent } from './create-plantilla-tablero.component';

describe('CreatePlantillaTableroComponent', () => {
  let component: CreatePlantillaTableroComponent;
  let fixture: ComponentFixture<CreatePlantillaTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlantillaTableroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlantillaTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

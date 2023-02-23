import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlantillaComponent } from './list-plantilla.component';

describe('ListPlantillaComponent', () => {
  let component: ListPlantillaComponent;
  let fixture: ComponentFixture<ListPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlantillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPeriodoComponent } from './list-periodo.component';

describe('ListPeriodoComponent', () => {
  let component: ListPeriodoComponent;
  let fixture: ComponentFixture<ListPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPeriodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

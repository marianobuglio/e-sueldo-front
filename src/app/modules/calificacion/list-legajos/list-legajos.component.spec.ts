import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLegajosComponent } from './list-legajos.component';

describe('ListLegajosComponent', () => {
  let component: ListLegajosComponent;
  let fixture: ComponentFixture<ListLegajosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLegajosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLegajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

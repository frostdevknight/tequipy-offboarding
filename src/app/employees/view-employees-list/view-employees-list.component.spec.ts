import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeesListComponent } from './view-employees-list.component';

describe('ViewEmployeesListComponent', () => {
  let component: ViewEmployeesListComponent;
  let fixture: ComponentFixture<ViewEmployeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEmployeesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

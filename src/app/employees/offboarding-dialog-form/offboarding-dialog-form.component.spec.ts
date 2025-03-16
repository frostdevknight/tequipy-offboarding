import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingDialogFormComponent } from './offboarding-dialog-form.component';

describe('OffboardingDialogFormComponent', () => {
  let component: OffboardingDialogFormComponent;
  let fixture: ComponentFixture<OffboardingDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingDialogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EmployeesService, OffboardData } from '../employees.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-offboarding-dialog-form',
  templateUrl: './offboarding-dialog-form.component.html',
  styleUrls: ['./offboarding-dialog-form.component.scss'],
  imports: [ReactiveFormsModule, MatDialogModule, MatInputModule, MatFormFieldModule]
})
export class OffboardingDialogFormComponent implements OnInit {
  offboardForm!: FormGroup;

  constructor(private fb: FormBuilder, private empoyeesService: EmployeesService, @Inject(MAT_DIALOG_DATA) public data: { id: string }) { }

  ngOnInit(): void {
    this.offboardForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        receiver: ['', Validators.required],
        streetLine1: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
      notes: [''],
      phone: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.offboardForm.valid) {
      console.log(this.data.id)
      const offboardData: OffboardData = this.offboardForm.value;
      this.empoyeesService.offboardEmployee(this.data.id, offboardData);
    }
  }
}

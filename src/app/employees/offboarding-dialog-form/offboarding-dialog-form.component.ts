import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeesService, OffboardData } from '../employees.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offboarding-dialog-form',
  templateUrl: './offboarding-dialog-form.component.html',
  styleUrls: ['./offboarding-dialog-form.component.scss'],
  imports: [ReactiveFormsModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule]
})
export class OffboardingDialogFormComponent implements OnInit {
  offboardForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empoyeesService: EmployeesService,
    private router: Router,
    private dialogRef: MatDialogRef<OffboardingDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }) { }

  ngOnInit(): void {
    this.offboardForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        receiver: ['', Validators.required],
        streetLine1: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required],
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
      this.router.navigate(['/employees']);
      this.dialogRef.close();
    }
  }
}

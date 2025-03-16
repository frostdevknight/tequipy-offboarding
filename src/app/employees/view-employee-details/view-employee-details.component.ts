import { Component, OnInit, input } from '@angular/core';
import { Employee, EmployeesService } from '../employees.service';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { OffboardingDialogComponent } from '../offboarding-dialog/offboarding-dialog.component';


@Component({
  selector: 'app-view-employee-details',
  imports: [MatTableModule, RouterLink, OffboardingDialogComponent],
  templateUrl: './view-employee-details.component.html',
  styleUrl: './view-employee-details.component.scss'
})
export class ViewEmployeeDetailsComponent implements OnInit {
  employee?: Employee;
  id = input.required<string>();

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.getEmployeeById(this.id()).subscribe(emp => {
      this.employee = emp;
    });
  }
}

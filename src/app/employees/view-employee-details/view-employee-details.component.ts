import { Component, OnInit, input } from '@angular/core';
import { Employee, EmployeesService } from '../employees.service';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { OffboardingDialogComponent } from '../offboarding-dialog/offboarding-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-view-employee-details',
  imports: [MatTableModule, RouterLink, OffboardingDialogComponent, MatButtonModule, MatIconModule, MatProgressBarModule],
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

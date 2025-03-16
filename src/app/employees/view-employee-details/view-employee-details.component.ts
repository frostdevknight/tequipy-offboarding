import { Component, OnInit } from '@angular/core';
import { Employee, EmployeesService } from '../employees.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-employee-details',
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './view-employee-details.component.html',
  styleUrl: './view-employee-details.component.scss'
})
export class ViewEmployeeDetailsComponent implements OnInit {
  employee?: Employee;
  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeesService.getEmployeeById(id!).subscribe(emp => {
      this.employee = emp;
    });
  }

  offboardEmployee(event: Event) {
    alert('Offboarding employee with id: ' + event);
  }
}

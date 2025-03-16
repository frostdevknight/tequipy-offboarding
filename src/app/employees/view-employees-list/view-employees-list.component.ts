import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Employee, EmployeesService } from '../employees.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-view-employees-list',
  imports: [MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './view-employees-list.component.html',
  styleUrl: './view-employees-list.component.scss'
})
export class ViewEmployeesListComponent implements AfterViewInit {
  employees: MatTableDataSource<Employee>
  displayedColumns: string[] = ['name', 'email', 'department', 'equipments', 'status'];

  constructor(private router: Router, private employeesService: EmployeesService) {
    this.employees = new MatTableDataSource<Employee>([]);
  }

  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.employees.filter = target.value.trim().toLowerCase();
  }

  redirectToEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.employees.sort = this.sort;

    this.employeesService.employees$.subscribe(employees => {
      this.employees.data = employees;
    });

    this.employeesService.loadEmployees();
  }
}

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../employees.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-view-employees-list',
  imports: [MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './view-employees-list.component.html',
  styleUrl: './view-employees-list.component.scss'
})
export class ViewEmployeesListComponent implements AfterViewInit {
  employees = new MatTableDataSource<Employee>([
    {
      id: '1',
      name: "Dominik Tarkiewicz",
      department: "IT",
      email: "dominik.tarkiewicz@gmail.com",
      status: "ACTIVE",
      equipments: []
    },
    {
      id: '2',
      name: "ADominik Tarkiewicz",
      department: "IT",
      email: "dominik.tarkiewicz@gmail.com",
      status: "ACTIVE",
      equipments: []
    },
    {
      id: '3',
      name: "BDominik Tarkiewicz",
      department: "IT",
      email: "dominik.tarkiewicz@gmail.com",
      status: "ACTIVE",
      equipments: []
    }]);

  displayedColumns: string[] = ['name', 'email', 'department', 'equipments', 'status'];

  constructor(private router: Router) { }

  redirectToEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.employees.sort = this.sort;
  }
}

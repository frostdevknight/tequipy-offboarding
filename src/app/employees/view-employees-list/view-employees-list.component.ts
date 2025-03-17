import { Component, ViewChild, AfterViewInit, signal, effect } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Employee, EmployeesService } from '../employees.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employees-list',
  imports: [MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressBarModule],
  templateUrl: './view-employees-list.component.html',
  styleUrl: './view-employees-list.component.scss'
})
export class ViewEmployeesListComponent implements AfterViewInit {
  employees: MatTableDataSource<Employee>
  displayedColumns: string[] = ['name', 'email', 'department', 'equipments', 'status'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private employeesService: EmployeesService) {
    this.employees = new MatTableDataSource<Employee>([]);
  }

  async fetchEmployees() {
    this.employeesService.employees$.subscribe(employees => {
      this.employees.data = employees;
    });

    this.employeesService.loadEmployees()
  }

  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.employees.filter = target.value.trim().toLowerCase();
  }

  redirectToEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  ngAfterViewInit() {
    this.employees.sort = this.sort;
  }
}

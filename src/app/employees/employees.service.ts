import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Equipment {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  email: string;
  status: 'ACTIVE' | 'OFFBOARDED';
  equipments: Equipment[];
}

export interface OffboardData {
  address: {
    streetLine1: string;
    country: string;
    postalCode: string;
    receiver: string;
  };
  notes: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadEmployees() {
    this.http.get<Employee[]>('api/employees').subscribe(employees => {
      this.employeesSubject.next(employees);
    });
  }

  getEmployeeById(id: string) {
    return this.http.get<Employee>(`api/employees/${id}`);
  }

  offboardEmployee(id: string, offboardData: OffboardData) {
    return this.http.post(`api/users/${id}/offboard`, offboardData)
      .pipe(
        tap(() => {
          const updatedEmployees = this.employeesSubject.value.map(emp =>
            emp.id === id ? { ...emp, status: 'OFFBOARDED' } : emp
          );
          this.employeesSubject.next(updatedEmployees as Employee[]);
        })
      );
  }
}

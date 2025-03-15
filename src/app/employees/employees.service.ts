import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
  }

  getEmployeeById(id: string) {
  }

  offboardEmployee(id: string, offboardData: OffboardData) {
  }
}

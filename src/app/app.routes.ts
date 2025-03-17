import { Routes } from '@angular/router';
import { ViewEmployeesListComponent } from '@/employees/view-employees-list/view-employees-list.component';
import { ViewEmployeeDetailsComponent } from '@/employees/view-employee-details/view-employee-details.component';
import { PageNotFoundComponent } from '@/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', title: "Tequipy - employees", component: ViewEmployeesListComponent },
  { path: 'employee/:id', title: "Tequipy - employee details", component: ViewEmployeeDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
];

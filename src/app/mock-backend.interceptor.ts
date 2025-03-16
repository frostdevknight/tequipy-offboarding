import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import employeesData from './employees.json';
import { Employee } from './employees/employees.service';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  mockServerState = employeesData;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`%cSimulating %c${request.method} %crequest to %c${request.url}`, 'font-size: 1rem;', 'color: #fbba72; font-size: 1rem;', 'font-size: 1rem;', 'color: #fbba72; font-size: 1rem;');

    if (request.url.endsWith('/employees') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.mockServerState })).pipe(delay(500));
    }

    if (request.url.match(/\/employees\/.+$/) && request.method === 'GET') {
      const employee = (this.mockServerState as Employee[]).find(e => e.id === request.url.split('/').pop());
      return of(new HttpResponse({ status: 200, body: employee })).pipe(delay(500));
    }

    if (request.url.match(/\/users\/.+\/offboard$/) && request.method === 'POST') {
      this.mockServerState = this.mockServerState.map(emp =>
        emp.id === request.url.split('/')[2] ? { ...emp, status: 'OFFBOARDED' } : emp
      );

      return of(new HttpResponse({ status: 200, body: request.body })).pipe(delay(500));
    }

    return next.handle(request);
  }
}

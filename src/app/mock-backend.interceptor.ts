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
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/employees') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: employeesData })).pipe(delay(500));
    }

    if (request.url.match(/\/employees\/.+$/) && request.method === 'GET') {
      const employee = (employeesData as Employee[]).find(e => e.id === request.url.split('/').pop());
      return of(new HttpResponse({ status: 200, body: employee })).pipe(delay(500));
    }

    if (request.url.match(/\/users\/.+\/offboard$/) && request.method === 'POST') {
      return of(new HttpResponse({ status: 200, body: request.body })).pipe(delay(500));
    }

    return next.handle(request);
  }
}

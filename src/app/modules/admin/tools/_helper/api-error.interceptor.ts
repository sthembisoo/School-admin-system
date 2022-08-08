import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }
  from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiErrorsInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
         
        }
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (
            error.status === 200 || 202) {
            this.toastr.success('Success', 'Action has been successfully completed');
          }
          else if (error.status === 400) {
            this.toastr.error('Error', 'Bad request');
          }
            else if (error.status === 401) {
            this.toastr.error('Error', 'Unauthorized');
            }
            else if (error.status === 403) {
            this.toastr.error('Error', 'Forbidden');
            }
            else if (error.status === 404) {
            this.toastr.error('Error', 'Not found');
            }
            else {
            this.toastr.error('Error', 'Internal server error');
            }
        }
        return throwError(error);
      })
    );

  }
}

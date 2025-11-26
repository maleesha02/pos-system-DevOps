import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {LoadingStatusService} from '../services/loading-status.service';
import {inject} from '@angular/core';
import {catchError, finalize, throwError} from 'rxjs';
import {CookieManagerService} from '../services/cookie-manager.service';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {

  let statusService:LoadingStatusService = inject(LoadingStatusService);
  const cookieManager = inject(CookieManagerService);
  const token = cookieManager.getToken('token');
  statusService.status.next(true);

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      // catch errors
      return throwError(()=>error)
    }),
    finalize(()=>{
      statusService.status.next(false);
    })
  )
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
 // res --> Show loading
 const _NgxSpinnerService = inject(NgxSpinnerService)
 
 _NgxSpinnerService.show()


  return next(req).pipe( finalize( ()=>{


    // logic
    _NgxSpinnerService.hide()

  } ) )  ; // res --> hide loading
};

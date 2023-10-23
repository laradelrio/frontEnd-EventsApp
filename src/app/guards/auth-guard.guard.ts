import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ApiDbService } from '../services/api-db.service';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize, take, tap } from 'rxjs';
import { ApiResp } from '../interfaces/interfaces.interface';
import { async } from '@angular/core/testing';


export const authGuardGuard: CanActivateFn = async() => {
  const apiDbService = inject(ApiDbService);
  const router = inject(Router);
  let isValidToken = await apiDbService.isValidToken()
  
  
  return !isValidToken ? router.navigate(['/login']) : true;
 
};

  










// export const authGuardGuard: CanActivateFn = async (route, state) => {
//   const apiDbService = inject(ApiDbService);
//   const router = inject(Router);
//   let tokenResp: ApiResp ={
//     status: false,
//     message: ''
//   };

// //is correct --> api return true, but to get in i need it to bve false

//   await apiDbService.validateToken()
//   .pipe(
//     finalize(()=> {console.log('token stat', tokenResp.status)})
//   )
//   .subscribe( (resp) => tokenResp = resp)


//   if(tokenResp.status){
//     console.log(tokenResp.status);
//     return router.navigate(['/home'])
//   }else {
//     return router.navigate(['/login'])
//   }
//   // return !tokenResp.status ?   : true  ;
 
// }



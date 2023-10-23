import { CanActivateFn, Router} from '@angular/router';
import { ApiDbService } from '../services/api-db.service';
import { inject } from '@angular/core';


export const authGuardGuard: CanActivateFn = async() => {
  const apiDbService = inject(ApiDbService);
  const router = inject(Router);

  let isValidToken = await apiDbService.isValidToken()
  
  return !isValidToken ? router.navigate(['/login']) : true;
 
};



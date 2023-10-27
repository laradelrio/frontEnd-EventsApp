import { CanActivateFn, Router} from '@angular/router';
import { UserApiDbService } from '../services/user-db-api.service';
import { inject } from '@angular/core';


export const authGuardGuard: CanActivateFn = async() => {
  const userApiDbService = inject(UserApiDbService);
  const router = inject(Router);

  let isValidToken = await userApiDbService.isValidToken()
  
  return !isValidToken ? router.navigate(['/login']) : true;
};



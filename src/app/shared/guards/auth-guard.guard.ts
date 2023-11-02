import { CanActivateFn, Router} from '@angular/router';
import { UserApiDbService } from '../../data/services/api/user-db-api.service';
import { inject } from '@angular/core';


export const authGuardGuard: CanActivateFn = async() => {
  const userApiDbService = inject(UserApiDbService);
  const router = inject(Router);

  let isValidToken = await userApiDbService.isValidToken()
  
  return !isValidToken ? router.navigate(['/auth/login']) : true;
};



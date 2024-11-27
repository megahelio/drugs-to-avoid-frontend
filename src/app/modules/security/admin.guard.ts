import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthentificationService } from '../drug/services/authentification.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authentication = inject(AuthentificationService)
  if (!authentication.authenticated) {
    router.navigate(['/login'])
  }
  return authentication.authenticated;
}


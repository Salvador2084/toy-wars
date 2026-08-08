import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.checked).pipe(
    filter(checked => checked),
    take(1),
    map(() => {
      if (authService.currentUser()) {
        return true;
      }
      router.navigateByUrl('/login');
      return false;
    })
  );
};
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('canActivate isLoggedIn()=',this._authService.isLoggedIn());
    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/extra/login'], {
        queryParams: {
          accessDenied: true
        }
      })
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

}

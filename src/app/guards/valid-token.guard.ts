import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ValidTokenGuard implements CanActivate {
  
  // service injection to validate token
  constructor(
    private _as: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Method CanActivate
   * This method will call to the Authentication service to verify our token
   * If the token is valid it will pass throught this guard and go to the protected route
   * If token is not validated it will redirect to auth route
   */

  canActivate(): Observable<boolean> | boolean {
    return this._as
        .verifyToken()
        .pipe(
          tap( validToken => {
            if(!validToken) this.router.navigateByUrl('/auth')
          })
        )
  }
  
}

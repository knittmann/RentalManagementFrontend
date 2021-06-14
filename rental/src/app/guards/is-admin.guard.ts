import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  
  constructor(private router: Router, private authGuardService: AuthGuardService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authGuardService.isLoggedIn) {
        alert('You must be logged in to view this page. You are being redirected to the log in page.');
        this.router.navigate(['/login'], { queryParams: {retUrl: route.url}});
        return false;
      } else if (!this.authGuardService.isAdmin) {
        alert('Your role does not permit you to view this page. Please login with an Admin account to continue.');
        // this.router.navigate(['/login'], { queryParams: {retUrl: route.url}});
        return false;
      }
      
      console.log('isLoggedIn: ' + this.authGuardService.isLoggedIn + '; isAdmin: ' + this.authGuardService.isAdmin);
        
      return true
  }
  
}

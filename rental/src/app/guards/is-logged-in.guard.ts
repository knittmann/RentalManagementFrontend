import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private router: Router, private authGuardService: AuthGuardService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authGuardService.isLoggedIn) {
        alert('You are not authorized to view this page.');
        this.router.navigate(['/login'], { queryParams: {retUrl: route.url}});
        return false;
      }
        return true;
  }
  
}

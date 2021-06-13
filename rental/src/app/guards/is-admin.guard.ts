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
      if (!this.authGuardService.isAdmin) {
        alert('You are not allowed to view this page. Please login with Admin account to continue.');
        this.router.navigate(['/login'], { queryParams: {retUrl: route.url}});
        return false;
      }
      return true
  }
  
}

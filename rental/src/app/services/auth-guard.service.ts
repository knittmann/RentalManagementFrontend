import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private isLoggedIn: boolean;
  private userName: string | undefined;
  private role: string | undefined;

  constructor() {
    this.isLoggedIn = false;
  }

  login(userName: string, password: string) {
    
    this.isLoggedIn = true;
    this.userName = userName;
    return of(this.isLoggedIn);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  isAdminUser(): boolean {
    if (this.role == 'admin') {
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}

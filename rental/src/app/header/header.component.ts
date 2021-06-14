import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { LocalStorageService } from "../services/local-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  public user: any = "User";
  public role: any | undefined;
  userSubscription: any;
  roleSubscription: any;

  constructor(private authGuardService: AuthGuardService,
    private router: Router,
    private localStorageService: LocalStorageService){}

  ngOnInit(): void {
    // this.user = this.authGuardService.userName;
    // this.role = this.authGuardService.userRole;
    this.userSubscription = this.authGuardService.currentUserNameChange.subscribe((value) => {
      this.user = value;
    });
    this.roleSubscription = this.authGuardService.currentUserRoleChange.subscribe((value) => {
      this.role = value;
    })
    console.log('Current User: ' + this.user);
  }
  
  logout() {
    this.authGuardService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.roleSubscription.unsubscribe();
  }

}

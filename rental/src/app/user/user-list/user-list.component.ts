import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: any;
  errorMsg: any;
  public role: any | undefined;
  roleSubscription: any;

  constructor(private userService: UserService,
     private router: Router,
     private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {this.users = data; console.log(data)},
      (error) => this.errorMsg = error,
      () => console.log("Completed")
    );
    this.roleSubscription = this.authGuardService.currentUserRoleChange.subscribe((value) => {
      this.role = value;
    });
  }

  isDisabled(): boolean {
    const userRole = localStorage.getItem('role');
    if (userRole == 'staff') {
      return true;
    } else {
      return false;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCredentialsMsg: string | undefined;
  user: any;
  userName: string | undefined;
  password: string | undefined;
  retUrl: string | null="home";

  constructor(
    private authGuardService: AuthGuardService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.retUrl = params.get('retUrl'); 
      console.log('LoginComponent/ngOnInit '+ this.retUrl);
    });
  }

  onLoginSubmit(loginForm: any) {
    this.authGuardService.login(loginForm.value.userName, loginForm.value.password).subscribe( data => {
      console.log('return to ' + this.retUrl);
      if (this.retUrl != null) {
        this.router.navigate([this.retUrl]);
      } else {
        this.router.navigate(['home']);
      }
    })
  }

}

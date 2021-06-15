import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // invalidCredentialsMsg: string | undefined;
  // user: any;
  // userName: string | undefined;
  // password: string | undefined;
  // retUrl: string | null="home";
  public loginForm: any;

  constructor(
    private authGuardService: AuthGuardService,
    private router: Router,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.loginForm= this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onLoginSubmit() {
    this.authGuardService.login(this.loginForm.value)
  }

}

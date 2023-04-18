import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { config } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Paths = config.PATHS
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
    const isLoggedIn = this.authService.isLoggedIn()
    if (isLoggedIn) {
      this.router.navigate([config.PATHS.Dashboard])
    }
  }
  login = () => {
    const data = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || ""
    }
    const loggedIn = this.authService.login(data)
    if (loggedIn) {
      this.router.navigate([config.PATHS.Dashboard])
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }
}

import { Component } from '@angular/core';
import { config } from 'src/app/utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  Paths = config.PATHS
  accountTypes = Object.values(config.ACCOUNT_TYPES)
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    accountType: ['', Validators.required],
  })

  register = () => {
    const data = {
      username: this.registerForm.value.username || "",
      password: this.registerForm.value.password || "",
      firstName: this.registerForm.value.firstName || "",
      lastName: this.registerForm.value.lastName || "",
      accountType: this.registerForm.value.accountType || config.ACCOUNT_TYPES.Savings,
    }
    const registered = this.authService.register(data)
    if (registered) {
      this.router.navigate([config.PATHS.Dashboard])
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }
}

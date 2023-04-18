import { Component, OnInit } from '@angular/core';
import { Account } from './interfaces/auth';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wallet';
  getAuthUser = this.authService.getAuthUser;
  isLoggedIn = this.authService.isLoggedIn;
  constructor(private authService: AuthService){ }
}

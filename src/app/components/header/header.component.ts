import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { config } from 'src/app/utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn = this.authService.isLoggedIn
  menu = false
  Paths = config.PATHS
  logout = () => {
    this.authService.logout()
  }

  toggleMenu = () => {
    this.menu = !this.menu
  }

  constructor(private authService: AuthService) { }
}

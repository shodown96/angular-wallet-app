import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { config } from 'src/app/utils/constants';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RouteGuard {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    let isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn){
      return true
    } else {
      this.router.navigate([config.PATHS.Login]);
      return false
    }
  }
  constructor(private authService: AuthService, private router: Router){};
}

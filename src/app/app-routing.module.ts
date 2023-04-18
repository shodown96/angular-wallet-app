import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MakeTransactionComponent } from './pages/make-transaction/make-transaction.component';
import { RouteGuard } from './services/route-guard/route-guard.service';
import { config } from './utils/constants';

const routes: Routes = [
  { path: config.ROUTES.Login, component: LoginComponent },
  { path: config.ROUTES.Register, component: RegisterComponent },
  { path: config.ROUTES.Dashboard, component: DashboardComponent, canActivate:[RouteGuard] },
  { path: config.ROUTES.Account, component: AccountComponent, canActivate:[RouteGuard] },
  { path: config.ROUTES.MakeTransaction, component: MakeTransactionComponent, canActivate:[RouteGuard] },
  { path: '', redirectTo: config.PATHS.Login, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

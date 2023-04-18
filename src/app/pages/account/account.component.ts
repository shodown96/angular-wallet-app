import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionService } from 'src/app/services/transactions/transactions.service';
import { formatAmount } from 'src/app/utils/common';
import { config } from 'src/app/utils/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  Paths = config.PATHS
  authUser: Account | null = null;
  balance = ""
  accountTypes = Object.values(config.ACCOUNT_TYPES)
  updateForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    accountType: ['', Validators.required],
  })
  ngOnInit(): void {
    this.authUser = this.authService.getAuthUser()
    this.updateForm.patchValue({...this.authUser})
    if (this.authUser)
      this.balance = formatAmount(this.transactionService.getBalance());
  }


  update = () => {
    const data = {
      firstName: this.updateForm.value.firstName || "",
      lastName: this.updateForm.value.lastName || "",
      username: this.updateForm.value.username || "",
      password: this.updateForm.value.password || "",
      accountType: this.updateForm.value.accountType || config.ACCOUNT_TYPES.Savings,
    }
    const updated = this.authService.update(data)
    if (updated) {
      this.router.navigate([config.PATHS.Dashboard])
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router) { }
}

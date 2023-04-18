import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/interfaces/auth';
import { Transaction } from 'src/app/interfaces/transaction';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionService } from 'src/app/services/transactions/transactions.service';
import { formatAmount } from 'src/app/utils/common';
import { config } from 'src/app/utils/constants';

@Component({
  selector: 'app-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.css']
})
export class MakeTransactionComponent {
  Paths = config.PATHS
  authUser: Account | null = null;
  transaction: Transaction | null = null;
  transactionTypes = Object.values(config.TRANSACTION_TYPES)
  balance = ""
  TRANSACTION_TYPE = config.TRANSACTION_TYPES.DEPOSIT
  accounts = this.transactionService.getAccounts()
  transactionForm = this.fb.group({
    amount: ['', Validators.required],
    type: ['DEPOSIT', Validators.required],
    destination: [''],
  })
  ngOnInit(): void {
    this.authUser = this.authService.getAuthUser()
    if (this.authUser) {
      this.balance = formatAmount(this.transactionService.getBalance())
    }

    this.transactionForm.get('type')?.valueChanges.subscribe((value) => {
      if (value === config.TRANSACTION_TYPES.TRANSFER) {
        this.transactionForm
          .get('destination')?.setValidators([Validators.required]);
        this.transactionForm.get('destination')?.updateValueAndValidity();
      } else {
        this.transactionForm.get('destination')?.clearValidators();
        this.transactionForm.get('destination')?.updateValueAndValidity();
      }
    });
  }

  submit = () => {
    if (this.authUser) {
      const authUserName = `${this.authUser.firstName} ${this.authUser.lastName}`
      const data = {
        amount: Number(this.transactionForm.value.amount) || 0,
        type: this.transactionForm.value.type || "",
        destination: this.transactionForm.value.destination || "",
        source: `${authUserName} - ${this.authUser.accountNumber}`,
        timestamp: new Date()
      }
      if (data.type === config.TRANSACTION_TYPES.DEPOSIT) {
        data.source = config.DEPOSIT_SOURCE
        data.destination = `${authUserName} - ${this.authUser.accountNumber}`
      } else if (data.type === config.TRANSACTION_TYPES.WITHDRAWAL) {
        data.destination = config.DEPOSIT_SOURCE
      }
      const updated = this.transactionService.makeTransaction(data)
      if (updated) {
        // this.router.navigate([config.PATHS.Dashboard])
        this.balance = formatAmount(this.transactionService.getBalance())
      }

    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router) {

  }
}

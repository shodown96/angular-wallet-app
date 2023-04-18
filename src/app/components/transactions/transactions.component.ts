import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  transactions = this.transactionService.getTransactions(true)
  constructor(private transactionService: TransactionService) { }
}

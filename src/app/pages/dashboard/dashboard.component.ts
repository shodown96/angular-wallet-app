import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionService } from 'src/app/services/transactions/transactions.service';
import { formatAmount } from 'src/app/utils/common';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Amounts received this year',
          data: [
            this.transactionService.getBalance(new Date(`1/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`2/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`3/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`4/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`5/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`6/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`7/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`8/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`9/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`10/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`11/1/${this.thisYear}`)),
            this.transactionService.getBalance(new Date(`12/1/${this.thisYear}`)),
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart("pieChart", {
      type: 'doughnut',
      data: {
        labels: ['Total Amount Received', 'Total Amount Spent'],
        datasets: [{
          label: 'Transactions',
          data: [
            this.transactionService.getInboundTransactions(),
            this.transactionService.getOutboundTransactions()
          ],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        }]
      }
    });
  }

  balance = formatAmount(this.transactionService.getBalance())
  totalOutboundTransactions = formatAmount(this.transactionService.getOutboundTransactions())
  totalInboundTransactions = formatAmount(this.transactionService.getInboundTransactions())
  usersCount = this.authService.getUsers().length || 0
  thisYear = new Date().getFullYear()
  authUser = this.authService.getAuthUser()
  transactions = this.transactionService.getTransactions(true)

  constructor(private transactionService: TransactionService,
    private authService: AuthService) { }
}

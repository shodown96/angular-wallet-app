import { Injectable } from '@angular/core';
import { LocalStorage } from '../../utils/storage';
import { config } from '../../utils/constants';
import { Transaction } from '../../interfaces/transaction';
import { Account } from 'src/app/interfaces/auth';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification/notification.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  storage = new LocalStorage()

  getAuthUsers = () => {
    return this.storage.getItem(config.DB_TABLES.Users)
  }

  getTransactions = (forUser: boolean = false) => {
    let transactions = this.storage.getItem(config.DB_TABLES.Transactions)
    const authUser = this.authService.getAuthUser()
    if (transactions && transactions.length > 0) {
      if (forUser) {
        transactions = transactions.filter((transaction: Transaction) =>
          transaction.destination.includes(authUser.accountNumber)
          || transaction.source.includes(authUser.accountNumber))
      }
      return transactions

    }
    return []
  }

  makeTransaction = (transaction: Transaction) => {
    if ((this.getBalance() < transaction.amount) && (transaction.type !== config.TRANSACTION_TYPES.DEPOSIT)) {
      this.notification.notify("Insufficent Funds")
      return false
    }
    const transactions = this.storage.getItem(config.DB_TABLES.Transactions)
    const users = this.storage.getItem(config.DB_TABLES.Users)
    if (transaction.type === config.TRANSACTION_TYPES.TRANSFER) {
      if (users && users.length > 0) {
        const user = users.find((u: Account) => transaction.destination.includes(u.accountNumber))
        if (user) {
          if (transactions && transactions.length > 0) {
            this.storage.setItem(config.DB_TABLES.Transactions, [...transactions, transaction])
          } else {
            this.storage.setItem(config.DB_TABLES.Transactions, [transaction])
          }
          this.notification.notify("Transaction successful!")
          return true
        }
      }
      this.notification.notify("The recipient of this transaction doesn't exist")
      return false;
    } else {
      if (transactions && transactions.length > 0) {
        this.storage.setItem(config.DB_TABLES.Transactions, [...transactions, transaction])
      } else {
        this.storage.setItem(config.DB_TABLES.Transactions, [transaction])
      }
      this.notification.notify("Transaction successful!")
      return true
    }
  }

  getInboundTransactions = (limit: Date | undefined = undefined) => {
    const initialValue = 0.0
    let transactions = this.getTransactions()
    const authUser = this.authService.getAuthUser()
    if (limit) {
      transactions = transactions.filter((transaction: Transaction) => {
        const lastday = new Date(limit.getFullYear(), limit.getMonth() + 1, 0)
        return ((new Date(transaction.timestamp).getTime()) >= limit.getTime()) &&
          ((new Date(transaction.timestamp).getTime()) <= lastday.getTime())
      })
    }
    return transactions.filter((transaction: Transaction) =>
      (transaction.destination.includes(authUser.accountNumber))
    ).reduce(
      (accumulator: number, transaction: Transaction) => accumulator + transaction.amount,
      initialValue
    )
  }

  getOutboundTransactions = (limit: Date | undefined = undefined) => {
    const initialValue = 0.0
    let transactions = this.getTransactions()
    const authUser = this.authService.getAuthUser()
    if (limit) {
      transactions = transactions.filter((transaction: Transaction) => {
        const lastday = new Date(limit.getFullYear(), limit.getMonth() + 1, 0)
        return ((new Date(transaction.timestamp).getTime()) >= limit.getTime()) &&
          ((new Date(transaction.timestamp).getTime()) <= lastday.getTime())
      })
    }
    return transactions.filter((transaction: Transaction) =>
      (transaction.source.includes(authUser.accountNumber))
    ).reduce(
      (accumulator: number, transaction: Transaction) => accumulator + transaction.amount,
      initialValue
    )
  }

  getBalance = (limit: Date | undefined = undefined) => {
    const initialValue = 0.0
    const transactions = this.storage.getItem(config.DB_TABLES.Transactions)
    if (transactions && transactions.length > 0) {
      const inbound = this.getInboundTransactions(limit)
      const outbound = this.getOutboundTransactions(limit)
      return (inbound - outbound)
    }
    return initialValue
  }

  getAccounts = () => {
    const users = this.getAuthUsers()
    const authUser = this.authService.getAuthUser()
    if (users) {
      return users.filter((user: Account) => user.accountNumber !== authUser.accountNumber)
        .map((user: Account) => ({
          value: `${user.firstName} ${user.lastName} - ${user.accountNumber}`,
        }))
    }
    return []
  }

  constructor(
    private authService: AuthService,
    private notification: NotificationService) { }
}

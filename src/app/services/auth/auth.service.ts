import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginParams, RegisterParams, Account } from '../../interfaces/auth';
import { genAccountNumber } from '../../utils/common';
import { config } from '../../utils/constants';
import { LocalStorage } from '../../utils/storage';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storage = new LocalStorage()

  getAuthUser = () => {
    return this.storage.getItem(config.AUTH_USER)
  }

  getUsers = () => {
    return this.storage.getItem(config.DB_TABLES.Users)
  }

  login = (params: LoginParams) => {
    const users = this.storage.getItem(config.DB_TABLES.Users)
    if (users && users.length > 0) {
      const user = users.find((user: LoginParams) =>
      (user.username === params.username
        && user.password === params.password))
      if (user) {
        this.storage.setItem(config.AUTH_USER, user)
        this.notification.notify("Login successful!")
        return true
      }
    }
    this.notification.notify("Invalid log in credentials!")
    return false
  }

  register = (params: RegisterParams) => {
    const users = this.storage.getItem(config.DB_TABLES.Users)
    const accountNumbers = users && users.length > 0 ? users.map((user: Account) => (user.accountNumber)) : []
    const user: Account = {
      ...params,
      accountNumber: genAccountNumber(accountNumbers)
    }

    if (users && users.length > 0) {
      const existingUser = users.find((u: Account) => u.username === user.username)
      if (existingUser) {
        this.notification.notify("A user with this username already exists!")
        return false
      } else {
        this.storage.setItem(config.DB_TABLES.Users, [...users, user])
        this.storage.setItem(config.AUTH_USER, user)
        this.notification.notify("Registration successful!")
        return true
      }
    } else {
      this.storage.setItem(config.AUTH_USER, user)
      this.storage.setItem(config.DB_TABLES.Users, [user])
      this.notification.notify("Registration successful!")
      return true
    }
  }

  update = (params: RegisterParams) => {
    const users = this.storage.getItem(config.DB_TABLES.Users)
    const authUser = this.getAuthUser()
    if (authUser) {
      const user: Account = {
        ...authUser,
        ...params,
      }
      if (users && users.length > 0) {
        const _user = users.find((u: Account) => u.accountNumber === user.accountNumber)
        if (_user) {
          const index = users.indexOf(_user)
          users[index] = user
          this.storage.setItem(config.DB_TABLES.Users, users)
          this.storage.setItem(config.AUTH_USER, user)
          this.notification.notify("Successfully updated your profile!")
          return true
        }

      }

    }
    return false
  }

  logout = () => {
    this.storage.removeItem(config.AUTH_USER)
    this.router.navigate([config.PATHS.Login])
    this.notification.notify("Successfully logged out!")
  }

  isLoggedIn = () => {
    const user = this.getAuthUser()
    if (user) {
      return true
    }
    return false
  }
  constructor(private router: Router, private notification: NotificationService) { }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser: any
  currentAcno: any

  option = {
    headers: new HttpHeaders()
  }

  constructor(private router: Router, private http: HttpClient) {
  }


  register(acno: any, username: any, password: any) {
    let data = {
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/register', data)
  }

  getToken() {
    var token = JSON.parse(localStorage.getItem('token') || "")
    let headers = new HttpHeaders()
    if (token) {
      this.option.headers = headers.append('token', token)
    }
    return this.option
  }

  deposit(acno: any, pswd: any, amount: any) {
    let data = {
      acno,
      password: pswd,
      amount
    }
    return this.http.post('http://localhost:3000/deposit', data, this.getToken())
  }



  withdraw(acno: any, pswd: any, amount: any) {
    let data = {
      acno,
      password: pswd,
      amount
    }
    return this.http.post('http://localhost:3000/deposit', data, this.getToken())
  }

  login(acno: any, pswd: any) {
    let data = {
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login', data)
  }

  getTransaction(acno: any) {
    let data = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction', data, this.getToken())
  }

  deleteAccount(acno: any) {
    return this.http.delete('http://localhost:3000/deleteAccount/' + acno)
  }

}

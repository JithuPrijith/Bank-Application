import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  acno = "";
  amount = "";
  password = "";
  acno1 = "";
  amount1 = "";
  password1 = "";
  result = ""
  user = ""
  inputAcno: any;
  systemData: any

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) {
    if (localStorage.getItem('currentAcno')) {
      this.user = JSON.parse(localStorage.getItem('currentUser') || "")

    }
    this.systemData = new Date()
  }
  ngOnInit(): void {
    var user = this.ds.currentUser
    if (!localStorage.getItem("currentAcno")) {
      alert("login again")
      this.logout()
    }
  }

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  deposit() {
    var acno = this.acno
    var pswd = this.password;
    var amount = this.amount;
    this.ds.deposit(acno, pswd, amount)
      .subscribe((result: any) => {
        alert(result.message)
        this.router.navigateByUrl('transaction')
      },
        (result) => {
          console.log(result)
        })
  }

  withdraw() {
    var acno1 = this.acno1
    var pswd1 = this.password1;
    var amount1 = this.amount1;
    this.ds.withdraw(acno1, pswd1, amount1)
      .subscribe((result: any) => {
        alert(result.message)
        this.router.navigateByUrl('transaction')
      },
        (result) => {
          alert(result.error.message)
        })
  }



  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  delete() {
    this.inputAcno = JSON.parse(localStorage.getItem("currentAcno") || "")
  }

  poda() {
    this.inputAcno = ""
  }

  ondelete(event: any) {
    this.ds.deleteAccount(event).subscribe((result: any) => {
      alert(result.message)
      this.router.navigateByUrl('')
    },
      (result) => {
        alert(result.error.message)
      })
  }
}

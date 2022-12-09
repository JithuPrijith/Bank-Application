import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passInput = "Enter your password"
  constructor(private ds: DataService, private fb : FormBuilder, private router :Router) { }

  ngOnInit(): void {
  }
loginForm = this.fb.group({
  acno:['',[Validators.required, Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
})

  login() {
    var pswd = this.loginForm.value.pswd;
    var acno = this.loginForm.value.acno;
    if(this.loginForm.valid){
      var result = this.ds.login(acno, pswd)
      .subscribe((result :any)=> {
        localStorage.setItem('currentUser', JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
        localStorage.setItem('token', JSON.stringify(result.token))
        console.log(result);
        
        alert(result.message)
        this.router.navigateByUrl('home-page')
      },
      (result : any) => { 
        alert(result.error.message)
        this.router.navigateByUrl('')
      })
    }
  }
}

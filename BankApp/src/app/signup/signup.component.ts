import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // username = "";
  // password = "";
  // acno = ""
  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  register() {
    var username = this.registerForm.value.username;
    var password = this.registerForm.value.password;
    var acno = this.registerForm.value.acno;
    if (this.registerForm.valid) {
      const result = this.ds.register(acno, username, password)
        .subscribe((result: any) => {
          alert(result.message)
          this.router.navigateByUrl('')
        },
          (error: any) => {
            alert(error.message);
            this.router.navigateByUrl('signup')
          }
        )
    }
  }
}

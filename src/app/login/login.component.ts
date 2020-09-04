import { Component, OnInit } from '@angular/core';
import { addMailEvent, validateCredentials } from '../controllers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor() {
    addMailEvent();
    localStorage.clear();
  }
  processCredentials = () => {
    if (validateCredentials(true, false, false)) {
      const emailElem = document.querySelector('#email-id') as HTMLInputElement;
      const passwordElem = document.querySelector(
        '#password-id'
      ) as HTMLInputElement;
      let email;
      let password;
      if (emailElem && passwordElem) {
        email = emailElem.value;
        password = passwordElem.value;
      }
      console.log(email, password);
      const obj = {
        email,
        password,
      };
      // fetch the login credentials from SAP
    }
  }

  ngOnInit(): void {}
}

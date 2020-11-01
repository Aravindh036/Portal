import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addMailEvent, validateCredentials } from '../controllers';
import portalDetails from '../basic-portal/all-portal-details.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private activeRouter: ActivatedRoute, private router: Router) {
    localStorage.clear();
  }
  loading: boolean;
  loginType: string;
  processCredentials = () => {
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
      const obj = {
        email,
        password,
      };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ user_id:email, password: password, type: this.activeRouter.snapshot.params.type });
      let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };
      this.loading = true;
      fetch("http://localhost:8000/generic/login", requestOptions as unknown)
          .then(response => response.json())
          .then(result => {
            console.log("result",result);
            if(result.status === "4 "){
              validateCredentials(true,true,false);
              console.log("wrong password");
              this.loading = false; 
            }
            else if(result.status !== "0"){
              console.log(result);
              localStorage.setItem("user_id", email);
              localStorage.setItem("customerName", result.status);
              localStorage.setItem("welcome", 'true');
              this.router.navigate([
                this.activeRouter.snapshot.params.type,
                'portal',
                portalDetails[this.activeRouter.snapshot.params.type][0].portal_list[0].url
              ]);
            }
          })
          .catch(error => console.log('error', error));
  }

  ngOnInit(): void {
    // addMailEvent();
    this.loginType = (this.activeRouter.snapshot.params.type).charAt(0).toUpperCase() + (this.activeRouter.snapshot.params.type).slice(1);
  }
}

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
    console.log("out fun")
    console.log("in fun")
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
      const raw = JSON.stringify({ userID:email, password: password });
      let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };
      this.loading = true;
      fetch("http://localhost:8000/customer/login", requestOptions as unknown)
          .then(response => response.json())
          .then(result => {
            console.log("result",result);
            if(result.status === "1 "){
              localStorage.setItem("user_id", email);
              this.router.navigate([
                this.activeRouter.snapshot.params.type,
                'portal',
                portalDetails[this.activeRouter.snapshot.params.type][0].portal_list[0].url
              ]);
            }
            else if(result.status === "0 "){
              validateCredentials(true,true,false);
              console.log("wrong password")
            }
          })
          .catch(error => console.log('error', error));
  }

  ngOnInit(): void {
    // addMailEvent();
    this.loginType = (this.activeRouter.snapshot.params.type).charAt(0).toUpperCase() + (this.activeRouter.snapshot.params.type).slice(1);
  }
}

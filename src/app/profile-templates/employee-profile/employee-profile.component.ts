import { Component, OnInit } from '@angular/core';
import sampleData from '../../sample-data.json';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  edit: any;
  profilePic: File = null;
  employeeFormElem = ['.col .name', '.col .email', '.col .company', '.col .role'];
  name: string;
  company: string;
  phoneNo: string;
  email: string;
  constructor() {
    this.edit = false;
  }

  ngOnInit(): void {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ userID:localStorage.getItem("user_id")});
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:8000/customer/profileDisplay", requestOptions as unknown)
        .then(response => response.json())
        .then(result => {
          console.log("result",result);
          this.name = result.NAME._text;
          this.company = result.COMPANY_NAME._text;
          this.email = (result.MAIL_ID._text).toLowerCase();
          this.phoneNo = result.PHONE_NUMBER._text;
        })
        .catch(error => console.log('error', error));
  }

  toggleEdit = () => {
    this.edit = !this.edit;
    for (const i of this.employeeFormElem){
      const input = document.querySelector(i) as HTMLInputElement;
      input.readOnly = !this.edit;
    }
  }

  toggleSave = () => {
    this.toggleEdit();
  }

  updateProfilePic = (event: Event) => {
    if (
      ((event.target as unknown) as HTMLInputElement).files &&
      ((event.target as unknown) as HTMLInputElement).files.length
    ) {
      const target = event.target as HTMLInputElement;
      this.profilePic = target.files[0];
      const profilePicElement = document.querySelector(
        '.current-profile-pic'
      ) as HTMLDivElement;
      const reader = new FileReader();
      reader.readAsDataURL(this.profilePic);
      reader.onloadend = () => {
        profilePicElement.style.backgroundImage = 'url(' + reader.result + ')';
      };
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  edit: boolean;
  loading: boolean;
  profilePic: File = null;
  employeeFormElem = ['.col .name', '.col .email', '.col .company', '.col .role', '.col .fax', '.col .gstin'];
 
  profileDetails = {
    name: '...',
    companyName: '...',
    address: '...',
    mailID: '...',
    city: '...',
    country: '...',
    phoneNumber: '...',
    faxNumber: '...',
    gstinNumber: '...',
    userId: '...'
  }
  constructor() {
    this.loading = true;
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
          this.profileDetails = {
            address: result.ADDRESS._text,
            city: result.CITY._text,
            companyName: result.COMPANY_NAME._text,
            country: result.COUNTRY._text,
            faxNumber: result.FAX_NUMBER._text,
            gstinNumber: result.GSTIN_NUMBER._text,
            mailID: (result.MAIL_ID._text).toLowerCase(),
            name: result.NAME._text,
            phoneNumber: result.PHONE_NUMBER._text,
            userId: result.CUSTOMER_ID._text
          }
          this.loading = false;
        })
        .catch(error => console.log('error', error));
  }
  toggleEdit = () => {
    this.edit = !this.edit;
    for (const i of this.employeeFormElem){
      const input = document.querySelector(i) as HTMLInputElement;
      input.readOnly = !this.edit;
    }
    const textarea = document.querySelector('.col .address') as HTMLTextAreaElement;
    textarea.readOnly = !this.edit;
  }

  toggleSave = () => {
    this.loading = true;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
       userID: this.profileDetails.userId,
       name: this.profileDetails.name,
       companyName: this.profileDetails.companyName,
       address: this.profileDetails.address,
       mailID: this.profileDetails.mailID,
       city: this.profileDetails.city,
       country: this.profileDetails.country,
       phoneNumber: this.profileDetails.phoneNumber,
       faxNumber: this.profileDetails.faxNumber,
       gstinNumber: this.profileDetails.gstinNumber,
      });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:8000/customer/profileUpdate", requestOptions as unknown)
        .then(response => response.json())
        .then(result => {
          console.log("result",result);
          this.toggleEdit();
          this.loading = false;
        })
        .catch(error => console.log('error', error));
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

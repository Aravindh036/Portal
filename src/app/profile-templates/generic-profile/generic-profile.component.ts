import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-profile',
  templateUrl: './generic-profile.component.html',
  styleUrls: ['./generic-profile.component.css']
})
export class GenericProfileComponent implements OnInit {


  edit: boolean;
  loading: boolean;
  profilePic: File = null;
  employeeFormElem = ['.col .name', '.col .email', '.col .role', '.col .fax'];
 
  profileDetails = {
    name: '...',
    address: '...',
    city: '...',
    country: '...',
    telephone: '...',
    faxnumber: '...',
    postalCode: '...',
    user_id: '...',
    street: '...',
    mail_id: '...'
  }
  country = {
    "IND": 'India'
  }
  profileType: string;
  constructor(private activeRouter: ActivatedRoute) {
    this.profileType = this.activeRouter.snapshot.params.type;
    this.loading = true;
    this.edit = false;
  }

  ngOnInit(): void {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ user_id:localStorage.getItem("user_id"), profile_type:this.profileType});
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:8000/generic/profileDisplay", requestOptions as unknown)
        .then(response => response.json())
        .then(result => {
          console.log("result",result);
          this.profileDetails = {
            address: result.status.records.STRAS._text,
            city: result.status.records.ORT01._text,
            country: result.status.records.LAND1._text,
            faxnumber: result.status.records.TELFX._text,
            postalCode: result.status.records.PSTLZ._text,
            name: result.status.records.NAME1._text,
            telephone: result.status.records.TELF1._text,
            user_id: result.status.records.LIFNR._text,
            street: result.status.records.ADRNR._text,
            mail_id:'demouser@kaartech.com'
          }
          this.loading = false;
        })
        .catch(error => console.log('error', error));
  }
  toggleEdit = () => {
    this.edit = !this.edit;
    for (const i of this.employeeFormElem){
      const input = document.querySelector(i) as HTMLInputElement;
      console.log(input)
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
      user_id: this.profileDetails.user_id,
       name: this.profileDetails.name,
       address: this.profileDetails.address,
       city: this.profileDetails.city,
       country: this.profileDetails.country,
       telephone: this.profileDetails.telephone,
       faxnumber: this.profileDetails.faxnumber,
       postalCode: this.profileDetails.postalCode,
       street: this.profileDetails.street,
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

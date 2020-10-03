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
  role: string;
  email: string;
  constructor() {
    this.edit = false;
    this.name = sampleData[0].name.first;
    this.company = sampleData[0].company;
    this.role = 'Software Engineer';
    this.email = sampleData[0].email;
  }

  ngOnInit(): void {
    // get profile details
  }

  toggleEdit = () => {
    this.edit = true;
    for (const i of this.employeeFormElem){
      const input = document.querySelector(i) as HTMLInputElement;
      input.readOnly = false;
    }
  }

  toggleSave = () => {
    this.edit = false;
    console.log(this.name);
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

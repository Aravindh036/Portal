import { Component, OnInit } from '@angular/core';
import { collapseSidebar } from '../controllers';
import portalDetails from '../basic-portal/all-portal-details.json';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileType: any;
  portalDetails = portalDetails;
  portalType: any;
  constructor(public activeRouter: ActivatedRoute, public router: Router) {
    this.portalType = "/" + this.activeRouter.snapshot.params.type;
  }

  ngOnInit(): void {
    this.profileType = this.activeRouter.snapshot.params.type;
    if (!(this.profileType in portalDetails)) {
      this.router.navigate(['error']);
    }
  }

  collapseSidebar = () => {
    collapseSidebar();
  }
}

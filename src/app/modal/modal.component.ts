import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }
  @Input() showBackdrop;
  toggleShow: boolean = false;
  ngOnInit(): void {
    if(localStorage.getItem("welcome")){
      this.showBackdrop = true;
      localStorage.removeItem('welcome');
    }
  }

  ngOnChanges(changes: SimpleChanges){
    this.showBackdrop = false;
    console.log(this.showBackdrop)
  }

}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portal-details',
  templateUrl: './portal-details.component.html',
  styleUrls: ['./portal-details.component.css'],
})
export class PortalDetailsComponent implements OnInit {
  @Input() selectedCardJson;
  @Input() profileType;
  @Input() cardJson;
  loading = false;
  constructor(private activeRouter: ActivatedRoute) {

  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.loading = true;
    setTimeout(() => this.loading = false, 1500)
    this.activeRouter.queryParams.subscribe(params => {
      if(params['doc']){
        console.log("params['page']",params['doc']);
        this.selectedCardJson = params['doc']
      }
    });
  }
  printDocument=()=>{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.querySelector('.portal-container').innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
  }
}

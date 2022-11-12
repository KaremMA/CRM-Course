import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.scss']
})
export class ServiceFilterComponent implements OnInit {

  constructor(
    private nbRefDailog:NbDialogRef<any>
  ) { }

  Branches = [];

  
 @Input() FilterObject:any;



  ngOnInit(): void {

    this.Branches = JSON.parse(localStorage.getItem("UserData")).userBranchs;

    console.log(this.Branches);
    
  }

  OnFilterSubmit(){
    
    this.nbRefDailog.close(this.FilterObject);
  }

}

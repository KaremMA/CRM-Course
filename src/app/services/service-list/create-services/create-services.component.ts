import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.scss']
})
export class CreateServicesComponent implements OnInit {

  constructor() { }

  ShowResultMenu = false;

  ngOnInit(): void {
  }

  onKeyPress(event){

    this.ShowResultMenu = true;
  }

}

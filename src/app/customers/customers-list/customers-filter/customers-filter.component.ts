import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { GeneralService } from 'src/app/@services/general.service';

@Component({
  selector: 'app-customers-filter',
  templateUrl: './customers-filter.component.html',
  styleUrls: ['./customers-filter.component.scss']
})
export class CustomersFilterComponent implements OnInit {

  constructor(
    private genral:GeneralService
  ) { }

  userBranchs = [];
  Activities = [];
  SystemModule = [];
  Cities = [];
  Products = [];

  advanchedFilter = new FormGroup({
    DateFrom: new FormControl(''),
    DateTo: new FormControl(''),
    IsRange	: new FormControl(false,),
    CityID: new FormControl('0',),
    ActivityID: new FormControl('0',),
    SystemModuleID: new FormControl('0',),
    ProductID: new FormControl('0',),
  })

  ngOnInit(): void {

    this.getFilterData()
  }

  getFilterData(){
    
    forkJoin([
      this.genral.getActivities(),
      this.genral.getCities(),
      this.genral.getSystemModuls(),
      this.genral.GetProducts()
    ]).subscribe({
      next: (res) => {

        this.Activities = res[0].JsonArray;
        this.Cities = res[1].JsonArray;
        this.SystemModule = res[2].JsonArray;
        this.Products = res[3].JsonArray;
      }
    })
  }


  getBranches(){

    this.userBranchs = JSON.parse(localStorage.getItem("UserData")).userBranchs;
  }

}

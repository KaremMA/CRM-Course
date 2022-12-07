import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { CustomersService } from 'src/app/@services/customers/customers.service';
import { GeneralService } from 'src/app/@services/general.service';

@Component({
  selector: 'app-customers-filter',
  templateUrl: './customers-filter.component.html',
  styleUrls: ['./customers-filter.component.scss']
})
export class CustomersFilterComponent implements OnInit {

  constructor(
    private genral:GeneralService,
    private toaster:NbToastrService,
    private customer:CustomersService,
    private dailogref:NbDialogRef<any>
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
    CityID: new FormControl(0),
    ActivityID: new FormControl(0),
    SystemModuleID: new FormControl(0),
    ProductID: new FormControl(0),
  })


  ngOnInit(): void {

    this.getFilterData();

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
        this.Products = res[3].JsonArray.filter(v => v.ProductCategoryID_PK == 1)[0].products;
        console.log(res);
      }
    })
  }

  
  onSubmit(){

    if(
      this.advanchedFilter.get("CityID").value == 0 &&
      this.advanchedFilter.get("ActivityID").value == 0 &&
      this.advanchedFilter.get("SystemModuleID").value == 0 &&
      this.advanchedFilter.get("ProductID").value == 0
    ){
      this.toaster.warning("تنبيه", "الرجاء تحديد واحدة من الحقول")
      return;
    }

    this.customer.getByFilter(this.advanchedFilter.getRawValue())
    .subscribe({
      next: (res) =>{

        console.log(res);
        this.dailogref.close(res.JsonArray);
      }
    })
    
  }

  getBranches(){

    this.userBranchs = JSON.parse(localStorage.getItem("UserData")).userBranchs;
  }

  close(){

    this.dailogref.close(false);
  }

}

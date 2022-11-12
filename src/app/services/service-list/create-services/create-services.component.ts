import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/@services/customers/customers.service';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.scss']
})
export class CreateServicesComponent implements OnInit {

  constructor(
    private customersService: CustomersService
  ) { }

  ShowResultMenu = false;

  SearchObject = {

    SearchValue: ''
  }

  SelectedCustomer:any = null;

  Customers = [];
  
  ServiceForm = new FormGroup({

    ServiceID_FK: new FormControl(0, Validators.required),
    Note: new FormControl(''),
    RequiredDate: new FormControl(new Date()),
    branchesIDs: new FormControl(),
    ApplicantName: new FormControl(''),
    ApplicantPhoneNumber: new FormControl('')
  })

  ngOnInit(): void {
  }


  onSubmit(){


  }

  onKeyPress(event) {

    this.ShowResultMenu = true;

    if (event.target.value == "") return;

    this.SearchObject.SearchValue = event.target.value;

    this.customersService.getCustomersBySerach(this.SearchObject)
      .subscribe({
        next: (res) => {

          this.Customers = res.JsonArray;
          console.log(  this.Customers );
        }
      })
  }

  SaveCustomerData(CustomerObject){

    this.SelectedCustomer = CustomerObject;

    this.ServiceForm.get("ApplicantName").setValue(CustomerObject.BranchMangerName)
    this.ServiceForm.get("ApplicantPhoneNumber").setValue(CustomerObject.BranchMangerPhoneNumber)

    console.log(CustomerObject);
    
  }

  HideSearchResult(){

    setTimeout(() => this.ShowResultMenu = false, 500)
  }

}

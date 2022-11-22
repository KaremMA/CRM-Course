import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CustomersService } from 'src/app/@services/customers/customers.service';
import { FormValidationService } from 'src/app/@services/form-validation.service';
import { ServiceService } from 'src/app/@services/Services/service.service';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.scss']
})
export class CreateServicesComponent implements OnInit {

  constructor(
    private customersService: CustomersService,
    private services:ServiceService,
    private toaster:NbToastrService,
    private dailogref: NbDialogRef<any>,
    private validation:FormValidationService
  ) { }

  ShowResultMenu = false;

  SearchObject = {

    SearchValue: ''
  }

  SelectedCustomer:any = null;

  Customers = [];
  
  ServiceForm = new FormGroup({

    ServiceID_FK: new FormControl(0, [Validators.required, this.validation.ValidateSelectInput]),
    Note: new FormControl(''),
    RequiredDate: new FormControl(new Date(), Validators.required),
    branchesIDs: new FormControl(),
    ApplicantName: new FormControl('', Validators.required),
    ApplicantPhoneNumber: new FormControl('', [Validators.required, this.validation.ValidatePhoneNumber])
  })


  ServicesModule = [];
  
  ngOnInit(): void {
    
  }

  
  MarkInvalidControls() {

    const controls = this.ServiceForm.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        
        controls[name].markAsTouched({ onlySelf: true });
      }
    }

  }


  onSubmit(){

    if(this.SelectedCustomer == null){

      this.toaster.warning("تنبية", "الرجاء تحديد زبون لتكملة العملية");
      return;
    }

    if(this.ServiceForm.invalid){
     
      this.MarkInvalidControls()
      return;
    }


    var ServiceObject = this.ServiceForm.getRawValue();
    ServiceObject.branchesIDs = [this.SelectedCustomer.BranchID_PK];

    console.log(ServiceObject);
    this.services.AddNewService(ServiceObject)
    .subscribe({
      next: (res) =>{

        if(res.StatusCode == 200){
          this.toaster.success("تمت العملية", "تمت عملية إضافة الخدمة بنجاح");
          this.dailogref.close(true);
        }else{

          this.toaster.danger("حدث خطأ", res.Message)
        }

        console.log(res);
        
      }
    })
    
  }

  close(){

    this.dailogref.close(false);

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

  SaveCustomerData(CustomerObject, branch){


    console.log(branch);
    
    branch.value = CustomerObject.Name;

    this.SelectedCustomer = CustomerObject;

    this.ServiceForm.get("ApplicantName").setValue(CustomerObject.BranchMangerName)
    this.ServiceForm.get("ApplicantPhoneNumber").setValue(CustomerObject.BranchMangerPhoneNumber)
    this.ServiceForm.get("ServiceID_FK").setValue(0)

    console.log(CustomerObject);
    
    this.getServiceModule(CustomerObject.SystemModulesID_FK)
  }

  getServiceModule(SystemModulesID_FK){

    this.services.getServicesBySystemModule(SystemModulesID_FK)
    .subscribe({
      next: (res) => {

        console.log(res);
        
        if(res.StatusCode == 200) {

          this.ServicesModule = res.JsonArray;

        }else{
          
          this.toaster.danger("حدث خطأ", res.Message);
        }
      }
    })
  }

  HideSearchResult(){

    setTimeout(() => this.ShowResultMenu = false, 500)
  }

}

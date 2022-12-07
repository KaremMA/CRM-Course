import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ColDef } from 'ag-grid-community';
import { CustomersService } from 'src/app/@services/customers/customers.service';
import { MessageBoxComponent } from 'src/app/sheard/message-box/message-box.component';
import { CustomersFilterComponent } from './customers-filter/customers-filter.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  constructor(
    private Customers:CustomersService,
    private toaster:NbToastrService,
    private dailogService:NbDialogService
  ) { }

  searchvalue =  {
      SearchValue: ""
  };

  private gridApi: any;
  private gridColumnApi: any;

  rowData = [];

  defaultColDef = {

    resizable: true,
    flex: 1,
    sortable: true
  };

  ngOnInit(): void {

    
    if(!!localStorage.getItem("searchvalue")){

      this.searchvalue = JSON.parse(localStorage.getItem("searchvalue"));
      this.onSearchClick()

    }

  }


  onSearchClick(){

    if(this.searchvalue.SearchValue == "") return;

    
    localStorage.setItem("searchvalue", JSON.stringify(this.searchvalue));
    this.Customers.getCustomersBySerach(this.searchvalue)
    .subscribe({
      next: (res) =>{
        if(res.StatusCode == 200){

          this.rowData = res.JsonArray;
        }else{

          this.toaster.danger("خطأ", res.Message)
        }
      }
    })
  }

  OpenFilter(){

    this.dailogService.open(CustomersFilterComponent).onClose
    .subscribe({
      next: (res) => {

        if(!res) return;

        this.rowData = res;
      }
    })
  }

  ConfermDelete(){

    const selectedData = this.gridApi.getSelectedRows();
    console.log(selectedData);
    
    if(selectedData.length == 0){

      this.toaster.warning("تنبية", "الرجاء تحديد شركة قبل عملية الحدف");
      return;
    }


    this.dailogService.open(MessageBoxComponent, {
      autoFocus: false,
      context: {
        Title: 'تأكيد العملية',
        Message: 'هل انت متأكد من عملية الحدف',
        OpenType: "YESNO"
      }
    }).onClose.subscribe({
      next: (res) => {

        if(!res) return;

        this.DeleteCustomers(selectedData[0].BranchID_PK);
      }
    })

  }

  DeleteCustomers(BranchID_PK){

    this.Customers.DeleteCustomers(BranchID_PK)
    .subscribe({next: (res) =>{

      if(res.StatusCode == 200){

        this.toaster.success("تمت العملية", "تمت عملية الحدف");
        this.onSearchClick();
      }else{

        this.toaster.danger("خطأ", res.Message)
      }
      console.log(res);
      
    }})
  }
  
  onGridReady(params) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  columnDefs: ColDef[] = [
    {
      field: 'CustomerCode',
      headerName: 'CustomerCode',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },

    },
    {
      field: 'BranchMangerPhoneNumber',
      headerName: 'رقم هاتف صاحب النشاط',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },

    },
    {
      field: 'BranchMangerName',
      headerName: 'اسم صاحب النشاط',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },

    },
    {
      field: 'Name',
      headerName: 'اسم الشركة',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },
    },
    {
      field: 'BranchID_PK',
      headerName: 'رقم الزبون',
      filter: 'agNumberColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },
    }
  ];


}

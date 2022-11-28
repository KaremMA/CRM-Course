import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ColDef } from 'ag-grid-community';
import { CustomersService } from 'src/app/@services/customers/customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  constructor(
    private Customers:CustomersService,
    private toaster:NbToastrService
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
  }


  onSearchClick(){

    if(this.searchvalue.SearchValue == "") return;

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

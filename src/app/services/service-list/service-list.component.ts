import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ColDef } from 'ag-grid-community';
import { ServiceService } from 'src/app/@services/Services/service.service';
import { MessageBoxComponent } from 'src/app/sheard/message-box/message-box.component';
import { CreateServicesComponent } from './create-services/create-services.component';
import { ServiceFilterComponent } from './service-filter/service-filter.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  constructor(
    private dailgoService: NbDialogService,
    private services: ServiceService,
    private toaster:NbToastrService,
    private router:Router
  ) { }

  private gridApi: any;
  private gridColumnApi: any;

  rowData = [];

  defaultColDef = {

    resizable: true,
    flex: 1,
    sortable: true
  };


  FilterObject = {
    IsRange: false,
    Duration: 1,
    DateType: 1,
    FromDate: '',
    ToDate: '',
    RefBranchID: null,
    ServiceStatusID: null,
    UserID: '',
    UserType: 1,
  }


  ngOnInit(): void {

    this.getServiceList();
  }

  getServiceList() {

      this.services.getServicesList(this.FilterObject)
      .subscribe({
        next: (res) => {

          this.rowData = res.JsonArray;
          console.log(res);
        }
      })

  }

  OpenFilter() {

    this.dailgoService.open(ServiceFilterComponent, {
      hasBackdrop: true,
      closeOnEsc: true,
      closeOnBackdropClick: true,
      context: {
        FilterObject: this.FilterObject
      }
    }).onClose.subscribe({
      next: (filterResult) =>{
        this.FilterObject = filterResult;
        this.getServiceList();
      }
    });
  }

  CreateNewServices(){
    
    this.dailgoService.open(CreateServicesComponent).onClose
    .subscribe({
      next: (res) =>{

        if(!res) return;

        this.getServiceList();
      }
    })
  }

  ConfermDelete(){

    
    const selectedData = this.gridApi.getSelectedRows();

    console.log(selectedData);
    
    if(selectedData.length == 0){

      this.toaster.warning("تنبية", "please Select Service to Delete");
      return;
    }

    if(selectedData[0].ServiseStatusID_FK != 10){

      this.ShowMessage();
      return;
    }

    this.dailgoService.open(MessageBoxComponent, {
      autoFocus: false,
      context: {
        Title: 'تأكيد العملية',
        Message: 'هل انت متأكد من عملية الحدف؟',
        OpenType: 'YESNO'
      }
    }).onClose.subscribe({
      next: (res) =>{

        if(!res) return;

        this.DeleteService(selectedData[0].ServiceRequestID_PK)
      }
    })

  }

  ShowMessage(){

    this.dailgoService.open(MessageBoxComponent, {
      autoFocus: false,
      context: {
        Title: 'لا يمكن إتمام العملية',
        Message: 'يمكن فقط حدف الخدمة اذا كانت حالتها قيد الانتظار!',
        OpenType: 'ONLYOK'
      }
    })
  }

  DeleteService(ServiceRequestID_PK){


    this.services.DeleteService(ServiceRequestID_PK)
    .subscribe({
      next: (res) =>{

        if(res.StatusCode == 200){

          this.toaster.success("تمت العملية", "تمت عملية الحدف");
          // this.getServiceList();
          this.rowData = this.rowData.filter(v => v.ServiceRequestID_PK != ServiceRequestID_PK)

        }else{

          this.toaster.danger("حذث خطأ", res.Message);

        }
      }
    })
    
  }

  ShowCustomerData(CustomerData){

    console.log(CustomerData);
    
    this.router.navigateByUrl(`/home/services/service-details/${CustomerData.data.ServiceRequestID_PK}`)
  }

  onGridReady(params) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  columnDefs: ColDef[] = [
    {
      field: 'Note',
      headerName: 'تفاصيل الخدمة',
      filter: 'agNumberColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },

    },
    {
      field: 'ServiceStatusCaption',
      headerName: 'حالة الخدمة',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },
      cellRenderer: (params) => {

        console.log(params);
        return `<span style="
        padding: 5px;
        font-size: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFF;
        background: ${params.data.ServiseStatusID_FK == 40 ? '#080': '#F0f' };
        border-radius: 5px;
        height: 100%;
        margin: 0 30px;
        font-weight: bold;
        ">${params.value}</span>`

      }

    },
    {
      field: 'ServiceCaption',
      headerName: 'نوع الخدمة',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },

    },
    {
      field: 'CreatedDate',
      headerName: 'تاريخ الانشاء',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },

    },
    {
      field: 'BranchName',
      headerName: 'فرع الزبون',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },

    },
    {
      field: 'CurrentBranchName',
      headerName: 'الفرع',
      filter: 'agSetColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },
    },
    {
      field: 'ServiceRequestID_PK',
      headerName: 'رقم الطلب',
      filter: 'agNumberColumnFilter',
      filterParams: { applyMiniFilterWhileTyping: true },
    }
  ];

}

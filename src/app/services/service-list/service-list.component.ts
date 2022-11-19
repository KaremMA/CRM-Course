import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ColDef } from 'ag-grid-community';
import { ServiceService } from 'src/app/@services/Services/service.service';
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
    private services: ServiceService
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

import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }


  items: NbMenuItem[] = [
    {
      title: "الخدمات",
      link: '/home/services'
    },
    {
      title: "الشركات و الفروع",
      expanded: true,
      children: [
        {
          title: "إضافة شركة",
          link: '/home/customers/add-new-customer'
        },
        {
          title: 'الشركات',
          link: '/home/customers/customers-list'
        }
      ]
    }
   ];

  ngOnInit(): void {
  }

}

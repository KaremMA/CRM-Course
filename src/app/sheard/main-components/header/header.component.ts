import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  
  items: NbMenuItem[] = [
    {
      title: "تسجيل الخروج",
      link: '/',
    }
   ];

  ngOnInit(): void {
  }

}

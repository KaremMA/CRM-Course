import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  @Input() Title:string = '';
  @Input() Message:string = '';
  @Input() OpenType: 'YESNO' | 'ONLYOK';

  constructor(
    private dailogRef:NbDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  close(State){

    this.dailogRef.close(State);
  }

}

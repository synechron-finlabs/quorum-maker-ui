import { Component, NgModule, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonService } from '../../../../service/common-service';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  @Input() displayaccount;
  @Output() showEvent = new EventEmitter();
  @Output() messageEvent = new EventEmitter<any>();
  accounts: any ;
  pwdAccount: string = "";
  response: any = {};
  msgs: Message[];

  constructor(private _CommonService: CommonService) { }

  ngOnInit() {
  
    this.getAccountList();
   
  }

  getAccountList(){
    this._CommonService.getAccountList().subscribe(
      res => {
        this.accounts = res.json();
        console.log("this.accounts>>>>>>>>>>>>",this.accounts);
      });
  }
  addAccount(pwdAccount) {
    // if (pwdAccount != "") { // pwd can be empty string hence commenting
      let params = {
        "password": pwdAccount || ""
      }
      this._CommonService.addAccount(params).subscribe(
        res => {
          this.response = res;
          console.log(this.response,"=====this.response=====");
          this.msgs = [];
          this.msgs.push({
            severity: 'success', summary: 'Success Message',
            detail: this.response.statusMessage
          });

          this.messageEvent.emit(this.msgs);
          //this.showEvent.emit(false);
          this.pwdAccount = "";
          this.getAccountList();
        },
          error => {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: '', 
            detail: 'Error while adding account.' });
            console.log('error', error);
  
          }
        );

    // }
  }

  onClose() {
    this.showEvent.emit(false);
  }

}

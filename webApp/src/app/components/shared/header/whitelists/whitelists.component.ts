import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonService } from '../../../../service/common-service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-whitelists',
  templateUrl: './whitelists.component.html',
  styleUrls: ['./whitelists.component.scss']
})
export class WhitelistsComponent implements OnInit {
  @Input() displayWhitelist;
  @Output() showEvent = new EventEmitter();
  @Output() msgEvent = new EventEmitter<any>();
  whitelists: any = [];
  addedwhitelistIp: any = [];
  response: any = {};
  msgs: Message[];
  listItems: any;
  connectedList: any;
  requestIps: any[];
  enableBtnForDeleted: boolean = false;
  hideAddNewBtn: boolean;

  constructor(private _CommonService: CommonService) { }

  ngOnInit() {
    this.getWhiteListIp();
  }

  getWhiteListIp() {
    this._CommonService.getWhiteListIp().subscribe(
      res => {
        let data = res.json();
        this.whitelists = data.whiteList;
        this.connectedList = data.connectedList;
        if (this.whitelists && this.whitelists.length){
          this.hideAddNewBtn = true;
        }
        console.log("this.whitelists>>>>>>>>>>>>", this.whitelists);
      });
  }

  deleteIp(index) {
    this.whitelists.splice(index, 1);
    this.enableBtnForDeleted = true;
    // if (this.whitelists.length == 0) {
    //   this.enableBtnForDeleted = true;
    // }
  }

  addWhiteListIp(listItems) {
    // this.hideAddNewBtn = false;
    this.whitelists = this.whitelists || [];
    if (listItems) {
      this.addedwhitelistIp.push(listItems);
      this.whitelists.push(listItems);
    }
  }

  addNewWhiteListIp() {
    this.hideAddNewBtn = true;
  }

  disableSave() {
    if (this.addedwhitelistIp.length != 0 || this.enableBtnForDeleted == true) {
      return false;
    }
    else {
      return true;
    }
  }
  updateWhiteListIp() {
    this._CommonService.addWhiteListIp(this.whitelists).subscribe(
      res => {
        if (res) {
          this.enableBtnForDeleted = false;
        }
        this.response = res;
        console.log(this.response, "=====this.response=====");
        this.msgs = [];
        this.msgs.push({
          severity: 'success', summary: 'Success Message',
          detail: this.response.statusMessage
        });

        this.msgEvent.emit(this.msgs);
        //this.showEvent.emit(false);
        this.getWhiteListIp();
      },
      error => {
        this.msgs = [];
        this.msgs.push({
          severity: 'error', summary: '',
          detail: 'Error while adding account.'
        });
        console.log('error', error);
      }
    );
  }

  onClose() {
    this.displayWhitelist = false;
    this.showEvent.emit(false);
  }

}

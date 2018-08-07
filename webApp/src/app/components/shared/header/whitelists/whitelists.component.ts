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
  whitelistedIp: any = [];
  response: any = {};
  msgs: Message[];
  listItems: any;
  connectedList: any;
  requestIps: any[];

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
        console.log("this.whitelists>>>>>>>>>>>>", this.whitelists);
      });
  }

  deleteIp(index) {
    this.whitelists.splice(index, 1);
  }

  addWhiteListIp(listItems) {
    this.whitelists = this.whitelists || [];
    this.whitelists.push(listItems);
  }

  updateWhiteListIp() {
    this._CommonService.addWhiteListIp(this.whitelists).subscribe(
      res => {
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

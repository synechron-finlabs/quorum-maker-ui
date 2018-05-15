import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../service/common-service';
import { MessageService } from '../../../service/message.service';
import { Subscription } from 'rxjs/Subscription';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  getLogsList: any;
  storeData: any;
  nodInfo: any;
  pendingRequest: any;
  getNodeInfoList: any;
  message: any;
  subscription: Subscription;
  public show: boolean = false;
  msgs: Message[];
  display: boolean = false;

  constructor(private messageService: MessageService, private cd: ChangeDetectorRef, private _CommonService: CommonService, ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.getNodeInfoList = message;
      console.log('this.message subscribe >>>>>>>>>>>', this.message);
    });
  }

  ngOnInit() {
    this.getPendingRequest();
    this.getLogsInfo()
  }

  toggle() {
    this.show = !this.show;
  }

  compileAndDeployContracts() {
    this.display = true;
    // this.cd.detectChanges(); 
    console.log('open >>>>>>>>>>', this.display)
  }

  closeFlag($event) {
    this.display = $event
    console.log('closeFlag >>>>>>>>>>', this.display)
    // this.cd.detectChanges();
  }

  getPendingRequest() {
    this._CommonService.getPendingRequest().subscribe(result => {
      this.pendingRequest = result.json();
      console.log(' this.pendingRequest>>>>>>', this.pendingRequest);
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }

  getLogsInfo() {
    this._CommonService.getLogs().subscribe(result => {
      this.getLogsList = result.json();
      console.log('this.getLogsList >>>>>>', this.getLogsList.statusMessage);
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }

  submitStatus(item, statusMgs) {
    this.nodInfo = item;
    console.log('this.nodInfo-------', this.nodInfo);
    let params = {
      "enode-id": this.nodInfo.enode,
      "status": statusMgs
    }
    this._CommonService.postjoinNetwork(params).subscribe(data => {
      this.storeData = data.json();
      console.log('this.storeData>>>>>>>>>>>>', this.storeData)
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: this.storeData.statusMessage });
      console.log('this.submitStatus.....>', this.msgs);
      this.getPendingRequest();
    },
      error => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: this.storeData.statusMessage });
        console.log('error', error);

      }
    );
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../../service/common-service';
import { MessageService } from '../../../service/message.service';
import { UtilityService } from "../../../service/utility.service";
import { Subscription } from 'rxjs/Subscription';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
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
  msgs: Message[] = [];
  displayUploadLogs: boolean = false;
  display: boolean = false;
  display2: boolean = false;
  displayaccount: boolean = false;
  serviceCallInterval: number;
  uploadLogPathStatus: boolean = false;
  notificationStatus: boolean = false;
  showNotification: boolean = false;
  notifications: any = [];
  displayWhitelist: boolean = false;

  constructor(private messageService: MessageService, private cd: ChangeDetectorRef, private _CommonService: CommonService, private utilityService: UtilityService) {

    this.serviceCallInterval = this.utilityService.serviceCallInterval;

    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.getNodeInfoList = message;
      //console.log('this.message subscribe >>>>>>>>>>>', this.message);
    });

    IntervalObservable.create(15000).subscribe(response => {
      if (!this.uploadLogPathStatus) {
        this.getUploadLogPathStatus();
      }
      this._CommonService.getPendingRequest().subscribe(result => {
        this.pendingRequest = result.json();
        //console.log(' this.pendingRequest>>>>>>', this.pendingRequest);
      }, err => {
        //console.log("Error occured", err);
      });
    });

  }

  ngOnInit() {
    this.getLogsInfo();
    this.getPendingRequest();
    this.getUploadLogPathStatus();
    // this.notifications.push("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.");
    // this.notifications.push("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.");
    if (this.notifications.length == 0) {
      this.notificationStatus = false;
    }
    else {
      this.notificationStatus = true;
    }
  }

  toggle() {
    this.show = !this.show;
  }

  autoClose(event) {
    //console.log('autoClose Event fired');
    var target = event.target;
    //console.log('autoClose target>>>', target);
    if (!target.closest(".dropdown-click")) {
      this.show = false;
    }
  }

  compileAndDeployContracts() {
    this.display = true;
    // this.cd.detectChanges(); 
    //console.log('open >>>>>>>>>>', this.display)
  }


  emailServerConfig() {
    this.display2 = true;
    // this.cd.detectChanges(); 
    //console.log('open >>>>>>>>>>', this.display2)
  }

  closeFlag(event) {
    this.display = event;
    this.display2 = event;
    this.displayaccount = event;
    //console.log('closeFlag >>>>>>>>>>', this.display)
    // this.cd.detectChanges();
  }

  onCloseWhitelist(event) {
    this.displayWhitelist = event;
    console.log('displayWhitelist >>>>>>>>>>', this.displayWhitelist)
  }

  receiveMessage($event) {
    this.msgs = $event
  }

  getPendingRequest() {
    this._CommonService.getPendingRequest().subscribe(result => {
      this.pendingRequest = result.json();
      //console.log(' this.pendingRequest>>>>>>', this.pendingRequest);
    },
      err => {
        //console.log("Error occured", err);
      }
    );
  }

  getLogsInfo() {
    this._CommonService.getLogs().subscribe(result => {
      this.getLogsList = result;
      //console.log('this.getLogsList >>>>>>', this.getLogsList.statusMessage);
    },
      err => {
        //console.log("Error occured", err);
      }
    );
  }

  submitStatus(item, statusMgs) {
    this.nodInfo = item;
    //console.log('this.nodInfo-------', this.nodInfo);
    let params = {
      "enode-id": this.nodInfo.enode,
      "status": statusMgs
    }
    // if (this.storeData != null) {
    this._CommonService.postjoinNetwork(params).subscribe(data => {
      this.storeData = data.json();
      //console.log('this.storeData>>>>>>>>>>>>', this.storeData)
      this.msgs = [];
      // let msgShow = this.storeData ? this.storeData.statusMessage : 'There is an error occured';
      this.msgs.push({ severity: 'success', summary: this.storeData.statusMessage });
      // //console.log('this.submitStatus.....>', this.msgs);
      this.getPendingRequest();
    },
      error => {
        //let msgShow = this.storeData ? this.storeData.statusMessage : 'There is an error occured';
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'There is an error occured' });
        //console.log('error', error);

      }
    );
  }

  uploadLogPath() {
    this.displayUploadLogs = true;
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  closeUploadLogsMsg(event) {
    var formMsg = event.msg;
    console.log("closeUploadLogsMsg>>>> ", event);
    this.displayUploadLogs = false;
    if (formMsg) {
      this.msgs.push({ severity: 'success', summary: formMsg });
      this.notificationStatus = true;
      this.notifications.push(formMsg);
      setTimeout(() => {
        this.msgs = [];
        this.cd.detectChanges();
        this.cd.markForCheck();
        this.getUploadLogPathStatus();
      }, 3000);
    }
  }

  getUploadLogPathStatus() {
    this._CommonService.getuploadLogsPath().subscribe(result => {
      let data: any = result.json();
      this.uploadLogPathStatus = data.statusMessage;
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }


  displayAccounts() {
    this.displayaccount = true;
  }
  displayWhitelists() {
    this.displayWhitelist = true;
  }
  toggleNotification() {
    this.showNotification = !this.showNotification;
  }
}
// }

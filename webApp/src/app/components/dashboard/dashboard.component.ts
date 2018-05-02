import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonService } from '../../service/common-service';
import { Message } from 'primeng/api';
import { MessageService } from '../../service/message.service';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  display: boolean = false;
  getNodeInfoDetails: any;
  getPeerDetails: any;
  getNodeListData: any;
  selected: any;
  getNodeInfoList: any;
  transactionsElement: any;
  hashElement: any;
  TxNDetails: any;
  BlockDetails: any;
  getBlockList: any = [];
  msgs: Message[];
  index: number;
  isExpanded: boolean = false;
  _BlkNum: number;
  selectedBlock: any;
  isBlocks: boolean = false;
  isNodeData: boolean = false;
  isSelected: any;
  //private noOfItemsToShowInitially: number = 5;
  private itemsToLoad: number = 5;
  itemsToShow: any;
  referenceNo = null;
  latestBlockData: any;
  private alive: boolean; // used to unsubscribe from the TimerObservable when OnDestroy is called.
  serviceCallInterval: number;
  timerIncrementInterval: number;
  latestTimeElapsed;
  latestTimeElapsedToDisplay;

  constructor(private _CommonService: CommonService, private messageService: MessageService, private _el: ElementRef) {
    this.alive = true;
    this.serviceCallInterval = 600; // in seconds
    this.timerIncrementInterval = 1; // in seconds
  }

  ngOnInit() {
    this.getBlocklisting(null);
    this.getNodeInfo();
    this.getNodeList()
    this.isNodeData = true;
    if ('nodeManager') {
      this.isSelected = 'nodeClass';
    }
    this.getLatestBlock();
    this.incrementTimer();
  }

  onScroll() {
    console.log("scrolled Down");
    //this.noOfItemsToShowInitially += this.itemsToLoad;
    this.referenceNo = this.referenceNo - 5;
    this.itemsToShow = this.getBlocklisting(this.referenceNo);
    console.log("scrolled Down");
    console.log('this.referenceNo>>>>>>>', this.referenceNo)
  }

  blockFilter(_hash) {
    console.log('hash>>>>', _hash);
    if (_hash == this.selectedBlock) {
      this.selectedBlock = '';
    } else {
      this.selectedBlock = _hash;
      let parentElement = this._el.nativeElement.querySelectorAll('.block-inner-list-wrapper')[1];
      let selectedElement: any;
      setTimeout(() => {
        selectedElement = this._el.nativeElement.querySelectorAll('.selected')[0].offsetTop - 45;
        console.log('selectedElement>......', selectedElement);
        document.getElementsByClassName('block-inner-list-wrapper')[1].scrollTo(0, selectedElement)
      }, 100);
      console.log('parentElement>......', parentElement);
    }
  }

  ExpandBlockDetails(_BlkNum) {
    this.getBlockDetails(_BlkNum);
    console.log('this.BlockDetails ExpandBlockDetails>>>>', _BlkNum);
  }

  ExpandTxNDetails(_hashKey) {
    this.getTxNDetails(_hashKey);
    console.log('this.BlockDetails ExpandBlockDetails>>>>', _hashKey);
  }

  getBlocklisting(referenceNo) {
    this._CommonService.getBlockData(referenceNo).subscribe(result => {
      console.log(this.getBlockList, '==this.getBlockList==');
      console.log(result.json(), '==data==');
      let data: any = [];
      data = result.json();
      data.forEach(element => {
        if (element.transactions) {
          this.getBlockList.push(element);
        }
      });
      if (this.referenceNo == null) this.referenceNo = this.getBlockList[0].number - this._CommonService.showEl;
      console.log(this.getBlockList, '==this.getBlockList==');
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }

  getBlockDetails(_BlkNum) {
    this._CommonService.getBlockDetails(_BlkNum).subscribe(data => {
      this.BlockDetails = data;
      console.log('---Block Details ---', this.BlockDetails);
    });
  }

  getLatestBlock() {
    TimerObservable.create(0, this.serviceCallInterval * 1000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this._CommonService.getLatestBlock().subscribe(data => {
          this.latestBlockData = data.json();
          this.latestTimeElapsed = this.latestBlockData.TimeElapsed;
          // console.log("latestTimeElapsed", this.latestTimeElapsed);
          this.latestTimeElapsedToDisplay = this.changeTimeformat(this.latestTimeElapsed);
        },
          err => {
            console.log("Error occured", err);
          });
      });
  }

  incrementTimer() {
    setInterval(() => {
      this.latestTimeElapsed += this.timerIncrementInterval;
      this.latestTimeElapsedToDisplay = this.changeTimeformat(3563);
    }, this.timerIncrementInterval * 1000);
  }

  changeTimeformat(latestTime) {
    let days = Math.floor(latestTime / (3600 * 24));
    latestTime -= days * 3600 * 24;
    let hours = Math.floor(latestTime / 3600);
    latestTime -= hours * 3600;
    let minutes = Math.floor(latestTime / 60);
    let seconds = latestTime - minutes * 60;
    let finalTime;
    if (!days) {
      finalTime = this.str_pad_left(hours, '0', 2) + ':' + this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
    }
    else {
      finalTime = days + ':' + this.str_pad_left(hours, '0', 2) + ':' + this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2);
    }
    return finalTime;
  }

  str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }


  getTxNDetails(_hashKey) {
    this._CommonService.getTxNDetails(_hashKey).subscribe(data => {
      this.TxNDetails = data;
      console.log('---TxNDetails Details ---', this.TxNDetails);
    });
  }

  getNodeInfo() {
    this._CommonService.getNodeInfo().subscribe(result => {
      this.getNodeInfoList = result.json();
      this.messageService.sendMessage(this.getNodeInfoList);
      console.log(' this.getNodeInfo>>>>>>', this.getNodeInfoList);
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }

  getNodeList() {
    this._CommonService.getNodeList().subscribe(result => {
      this.getNodeListData = result.json();
      console.log(' this.getNodeListData>>>>>>', this.getNodeListData);
      this.getNodeListData.forEach((element, index) => {
        if (index == 0) {
          element['isActive'] = true;
        }
      });
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }

  isShowCont(isActive) {
    if (isActive == 'getBlocks') {
      this.isSelected = 'blockClass';
      this.isBlocks = true;
      this.isNodeData = false;
    } else {
      if (isActive == 'nodeManager') {
        this.isSelected = 'nodeClass';
        this.isNodeData = true;
        this.isBlocks = false;
      }
    }
  }

  getNodeDetailist(_NodeKey) {
    this._CommonService.nodeDetail(_NodeKey).subscribe(data => {
      this.getNodeInfoDetails = data.json();
      console.log('---getNodeInfoDetails ---', this.getNodeInfoDetails);
    });
  }

  getNodeDetails(item) {
    //console.log('item onClick', item);
    if (item.isActive == true) {
      this.display = true;
      this._CommonService.peerDetails().subscribe(result => {
        this.getPeerDetails = result.json();
        console.log(' this.getPeerDetails>>>>>>', this.getPeerDetails);
      },
        err => {
          console.log("Error occured", err);
        }
      );
    } else {
      this.display = true;
      this.getNodeDetailist(item.enode);
      console.log(' item.enode>>>>>>', item.enode);
    }
  }

  closeFlag($event) {
    this.display = $event
    console.log('closeFlag >>>>>>>>>>', this.display)
  }

  ngOnDestroy() {
    this.messageService.clearMessage();
    console.log('Destroy in dashboard')
  }
}

import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonService } from '../../service/common-service';
import { UtilityService } from "../../service/utility.service";
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
  //getNodeListData4: any[];
  getNodeListData3: any[];
  getNodeListData2: any;
  getNodeListData1: any;
  getSearchedTxN: any;
  currentBlockNumber: any;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  getNodeInfoDetails: any;
  getPeerDetails: any = {};
  getNodeListData: any = {};
  nodeLatency: any;
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
  //private itemsToLoad: number = 5;
  itemsToShow: any;
  referenceNo = null;
  latestBlockData: any;
  private alive: boolean; // used to unsubscribe from the TimerObservable when OnDestroy is called.
  serviceCallInterval: number;
  timerIncrementInterval: number;
  latestTimeElapsed;
  latestTimeElapsedToDisplay;
  counter = 0;
  refSerach: boolean = false;

  constructor(private _CommonService: CommonService, private messageService: MessageService, private _el: ElementRef, private utilityService: UtilityService) {
    this.alive = true;
    this.serviceCallInterval = this.utilityService.serviceCallInterval; // in seconds
    this.timerIncrementInterval = 1; // in seconds
  }

  ngOnInit() {
    // console.log(this.display, "this.display");
    // console.log(this.display2, "this.display2");
    this.getNodeLatency();
    this.getBlocklisting(null);
    this.getNodeInfo();
    this.getNodeList()
    this.isBlocks = true; // on page load block and transaction would show by default on dashboard
    if ('nodeManager') {
      this.isSelected = 'nodeManager';
    }
    this.getLatestBlock();
    this.incrementTimer();
  }

  onScroll() {
    console.log("scrolled Down");
    //this.noOfItemsToShowInitially += this.itemsToLoad;
    if (this.refSerach == false) {
      if (this.counter == 0) {
        this.referenceNo = this.referenceNo - 6;
      } else {
        this.referenceNo = this.referenceNo - 7;
      }
      this.counter++;

      this.itemsToShow = this.getBlocklisting(this.referenceNo);
    }

    console.log("scrolled Down");
    console.log('this.referenceNo>>>>>>>', this.referenceNo)
  }

  checkType(type) {
    type = type.toLowerCase();
    return type;
  }

  blockFilter(_hash) {
    console.log('hash>>>>', _hash);
    if (_hash == this.selectedBlock) {
      this.selectedBlock = '';
    } else {
      this.selectedBlock = _hash;
      let parentElement = this._el.nativeElement.querySelectorAll('.block-inner-list-wrapper')[1];
      console.log('parentElement>>>', parentElement);
      let selectedElement: any;
      setTimeout(() => {
        selectedElement = this._el.nativeElement.querySelectorAll('.selected')[0].offsetTop - 54;
        console.log('selectedElement>......', selectedElement);
        document.getElementsByClassName('block-inner-list-wrapper')[1].scrollTo(0, selectedElement)
      }, 100);
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

  getSearchedTxNData(_hashKey) {
    if (_hashKey) {
      this.refSerach = true;
      this._CommonService.getTxNblocks(_hashKey).subscribe(result => {
        console.log('result>>>>>', result)
        this.getBlockList = []
        this.getBlockList.push(result);
        this.counter = 0
        this.referenceNo = null
        console.log('this.getBlockList tanscation >>>>>', this.getBlockList)
      })
    } else {
      //this.getBlockList = []
      this.refSerach = false;
      this.getBlockList = []
      this.getBlocklisting(null);
      document.getElementsByClassName('block-inner-list-wrapper')[1].scrollTo(0, 0);
    }
  }

  getBlocklisting(referenceNo) {
    this._CommonService.getBlockData(referenceNo).subscribe(result => {
      let data: any = [];
      data = result.json();
      console.log('==this.data==----', data);
      data.forEach(element => {
        console.log('element.transactions.....', element.transactions)
        if (element.transactions) {
          this.getBlockList.push(element);
        }
      });
      if (this.referenceNo == null) {
        // this.referenceNo = this.getBlockList[0].number - this._CommonService.showEl;
        this.referenceNo = this.getBlockList[0].number;
      }
      console.log(this.getBlockList, '==this.getBlockList==');
      // below logic added to show list with blockNumber greater than 0 
      this.getBlockList = this.getBlockList.filter(
        block => block.number > 0
      );
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }


  getSearchedData(_BlkNum) {
    console.log('Block Number>>>>>>>', _BlkNum);
    if (_BlkNum) {
      this.refSerach = true;
      this._CommonService.getBlockDetails(_BlkNum).subscribe(result => {
        this.getBlockList = []
        this.getBlockList.push(result);
        this.counter = 0
        this.referenceNo = null
      })
    } else {
      //this.getBlockList = []
      this.refSerach = false;
      this.getBlockList = []
      this.getBlocklisting(null);
      document.getElementsByClassName('block-inner-list-wrapper')[1].scrollTo(0, 0);

    }
  }

  getBlockDetails(_BlkNum) {
    this._CommonService.getBlockDetails(_BlkNum).subscribe(data => {
      this.BlockDetails = data;
      console.log('---Block Details ---', this.BlockDetails);
    });
  }

  getLatestBlock() {
    TimerObservable.create(0, this.serviceCallInterval * 60000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this._CommonService.getLatestBlock().subscribe(data => {
          this.latestBlockData = data.json();
          //console.log('this.later', this.currentBlockNumber);
          if (this.currentBlockNumber != this.latestBlockData.latestBlockNumber) {
            this.getBlockList = [];
            this.getBlocklisting(null);
            this.currentBlockNumber = this.latestBlockData.latestBlockNumber;
            console.log('this.currentBlockNumber if>>>>>>>>>', this.currentBlockNumber);
          }
          this.latestTimeElapsed = this.latestBlockData.TimeElapsed;
          // console.log("latestTimeElapsed", this.latestBlockData);
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
      this.latestTimeElapsedToDisplay = this.changeTimeformat(this.latestTimeElapsed);
    }, this.timerIncrementInterval * 1000);
  }

  changeTimeformat(latestTime) {
    let days = Math.floor(latestTime / (3600 * 24));
    latestTime -= days * 3600 * 24;
    let hours = Math.floor(latestTime / 3600);
    latestTime -= hours * 3600;
    let minutes = Math.floor(latestTime / 60);
    let seconds = latestTime - minutes * 60;
    let finalTime = this.twoDigit(hours) + ':' + this.twoDigit(minutes) + ':' + this.twoDigit(seconds);

    if (days > 0) {
      finalTime = days + ' Day' + (days > 1 ? 's' : '');
      // if days and time both need to be shown below to be used
      // finalTime = days + ' Day' + (days > 1 ? 's' : '') + ' & '
      //   + this.twoDigit(hours) + ':' + this.twoDigit(minutes) + ':' + this.twoDigit(seconds) + ' hrs';
    }
    return finalTime;
  }

  private twoDigit(num) {
    return ("0" + num).slice(-2);
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
      this.currentBlockNumber = this.getNodeInfoList.blockNumber;
      console.log('this.currentBlockNumber>>>>>>>', this.currentBlockNumber)
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
      this.getNodeListData1 = this.getNodeListData.filter(x => x.self == 'true');
      this.getNodeListData2 = this.getNodeListData.filter(x => x.self == 'false');
      // this.getNodeListData4 = [this.getNodeListData1, ...this.getNodeListData2];
      this.getNodeListData3 = this.getNodeListData1.concat(this.getNodeListData2);
      console.log('this.getNodeListData3>>>>>>', this.getNodeListData3);
      // this.getNodeListData.forEach((element, index) => {
      //   if (index == 0) {
      //     element['isActive'] = true;
      //     element['time'] = "";
      //   }
      // });
    },
      err => {
        console.log("Error occured", err);
      }
    );
  }

  getNodeLatency() {
    this._CommonService.getNodeLatency().subscribe(result => {
      this.nodeLatency = result.json();
      console.log(' this.nodeLatency>>>>>>', this.nodeLatency);
      // below logic to set time in getNodeListData array to show latency in template
      for (let element of this.nodeLatency) {
        for (let obj of this.getNodeListData) {
          if (element['enode-id'] == obj['enode']) {
            obj['time'] = element['latency'] + " ms";
          }
        }
      }
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
      this.display2 = false;
      this._CommonService.peerDetails().subscribe(result => {
        this.getPeerDetails = result.json();
        console.log(' this.getPeerDetails>>>>>>', this.getPeerDetails);
      },
        err => {
          console.log("Error occured", err);
        }
      );
    } else {
      this.display2 = true;
      this.display = false;
      this.getNodeDetailist(item.enode);
      console.log(' item.enode>>>>>>', item.enode);
    }
  }

  closeFlag($event) {
    this.display = $event;
    this.display2 = $event;
    this.display3 = $event;
    console.log('closeFlag >>>>>>>>>>', this.display)
  }

  ngOnDestroy() {
    this.messageService.clearMessage();
    console.log('Destroy in dashboard')
  }
}

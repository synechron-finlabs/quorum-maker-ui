import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../service/common-service';
import { Message } from 'primeng/api';
import { MessageService } from '../../service/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  selected: any;
  getNodeInfoList: any;
  transactionsElement: any;
  hashElement: any;
  TxNDetails: any;
  BlockDetails: any;
  getBlockList: any;
  msgs: Message[];
  index: number;
  isExpanded: boolean = false;
  _BlkNum: number;
  selectedBlock: any;
  isBlocks: boolean = false;
  isNodeData: boolean = false;
  isSelected: any;

  constructor(private _CommonService: CommonService, private messageService: MessageService) { }

  ngOnInit() {
    this.getBlocklisting();
    this.getNodeInfo();
    this.isNodeData = true;

    if ('nodeManager') {
      this.isSelected = 'nodeClass';
    }



  }

  blockFilter(_hash) {
    console.log('hash>>>>', _hash);
    this.selectedBlock = _hash;

  }

  ExpandBlockDetails(_BlkNum) {
    this.getBlockDetails(_BlkNum);
    console.log('this.BlockDetails ExpandBlockDetails>>>>', _BlkNum);
  }

  ExpandTxNDetails(_hashKey) {
    this.getTxNDetails(_hashKey);
    console.log('this.BlockDetails ExpandBlockDetails>>>>', _hashKey);
  }

  getBlocklisting() {
    this._CommonService.getBlockData().subscribe(result => {
      this.getBlockList = result.json();
      console.log(' this.getBlockList>>>>>>', this.getBlockList)
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

  ngOnDestroy() {
    this.messageService.clearMessage();
    console.log('Destroy in dashboard')
  }
}

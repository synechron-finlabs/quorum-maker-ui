import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common-service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  BlockDetails: any;
  getBlockList: any;
  msgs: Message[];
  index: number;
  isExpanded: boolean = false;
  _BlkNum: number;

  constructor(private _CommonService: CommonService, ) { }

  ngOnInit() {
    this.getBlocklisting();
  }


  ExpandBlockDetails(_BlkNum) {
    this.getBlockDetails(_BlkNum);
    console.log('this.BlockDetails ExpandBlockDetails>>>>', _BlkNum);
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
}

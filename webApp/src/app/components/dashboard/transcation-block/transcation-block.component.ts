import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transcation-block',
  templateUrl: './transcation-block.component.html',
  styleUrls: ['./transcation-block.component.scss']
})
export class TranscationBlockComponent implements OnInit {
  @Input() getBlocks: any;
  @Input() TxNDetails: any;
  //@Input() redClassBool: boolean;
  constructor() { }

  ngOnInit() {
  }

}

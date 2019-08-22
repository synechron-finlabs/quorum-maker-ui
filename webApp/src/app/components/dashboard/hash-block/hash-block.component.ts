import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hash-block',
  templateUrl: './hash-block.component.html',
  styleUrls: ['./hash-block.component.scss']
})
export class HashBlockComponent implements OnInit, OnChanges {
  @Input() getBlocks: any;
  //@Input() isExpanded: boolean;
  @Input() BlockDetails: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (this.BlockDetails) {
    //   console.log('this.BlockDetails.number >>>',changes.BlockDetails);
    // }
  }

}

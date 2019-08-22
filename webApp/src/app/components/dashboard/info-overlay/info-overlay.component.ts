import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../../service/common-service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-info-overlay',
  templateUrl: './info-overlay.component.html',
  styleUrls: ['./info-overlay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoOverlayComponent implements OnInit, OnDestroy {
  user: any
  msgs: Message[];
  @Input() display;
  @Input() display2;
  @Input() listItem;
  @Input() listItem2;
  @Output() showEvent = new EventEmitter();

  constructor(private _CommonService: CommonService) { }

  onClose() {
    this.showEvent.emit(false);
  }

  ngOnInit() { }

  updateNodeSubmitData(data) {
    console.log('data>>>>', data);
    let params = {
      nodeName: data.name,
      role: data.role
    }
    this._CommonService.updateNode(params).subscribe(data => {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Node Name and Role has been updated successfully' });
      console.log('this.msgs.....>', this.msgs);
    },
      error => {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: '', detail: 'Node Name and Role update Failed!' });
        console.log('error', error);
      }
    );

  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.showEvent.unsubscribe();
  }
}

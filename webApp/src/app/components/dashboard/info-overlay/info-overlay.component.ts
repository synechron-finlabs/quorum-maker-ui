import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-info-overlay',
  templateUrl: './info-overlay.component.html',
  styleUrls: ['./info-overlay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoOverlayComponent implements OnInit, OnDestroy {
  @Input() display;
  @Input() display2;
  @Input() listItem;
  @Input() listItem2;
  @Output() showEvent = new EventEmitter();

  constructor() { }

  onClose() {
    this.showEvent.emit(false);
  }

  ngOnInit() {
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.showEvent.unsubscribe();
  }
}

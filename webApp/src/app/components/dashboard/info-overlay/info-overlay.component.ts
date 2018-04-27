import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-info-overlay',
  templateUrl: './info-overlay.component.html',
  styleUrls: ['./info-overlay.component.scss']
})
export class InfoOverlayComponent implements OnInit, OnDestroy {
  @Input() display;
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

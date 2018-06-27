import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscationBlockComponent } from './transcation-block.component';

describe('TranscationBlockComponent', () => {
  let component: TranscationBlockComponent;
  let fixture: ComponentFixture<TranscationBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranscationBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

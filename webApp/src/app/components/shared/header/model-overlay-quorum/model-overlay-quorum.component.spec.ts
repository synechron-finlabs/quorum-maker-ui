import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOverlayQuorumComponent } from './model-overlay-quorum.component';

describe('ModelOverlayQuorumComponent', () => {
  let component: ModelOverlayQuorumComponent;
  let fixture: ComponentFixture<ModelOverlayQuorumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOverlayQuorumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOverlayQuorumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashBlockComponent } from './hash-block.component';

describe('HashBlockComponent', () => {
  let component: HashBlockComponent;
  let fixture: ComponentFixture<HashBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

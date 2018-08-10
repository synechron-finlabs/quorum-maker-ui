import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitelistsComponent } from './whitelists.component';

describe('WhitelistsComponent', () => {
  let component: WhitelistsComponent;
  let fixture: ComponentFixture<WhitelistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitelistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitelistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

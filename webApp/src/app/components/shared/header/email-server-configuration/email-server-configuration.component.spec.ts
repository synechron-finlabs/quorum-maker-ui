import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailServerConfigurationComponent } from './email-server-configuration.component';

describe('EmailServerConfigurationComponent', () => {
  let component: EmailServerConfigurationComponent;
  let fixture: ComponentFixture<EmailServerConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailServerConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailServerConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

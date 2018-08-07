import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLogPathComponent } from './upload-log-path.component';

describe('UploadLogPathComponent', () => {
  let component: UploadLogPathComponent;
  let fixture: ComponentFixture<UploadLogPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLogPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLogPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

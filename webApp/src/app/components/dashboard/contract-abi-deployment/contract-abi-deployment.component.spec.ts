import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAbiDeploymentComponent } from './contract-abi-deployment.component';

describe('ContractAbiDeploymentComponent', () => {
  let component: ContractAbiDeploymentComponent;
  let fixture: ComponentFixture<ContractAbiDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAbiDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAbiDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

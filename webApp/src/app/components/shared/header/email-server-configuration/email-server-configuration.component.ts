import { Component, NgModule, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailServerConfig } from '../../../../models/';
import { CommonService } from '../../../../service/common-service';
import { Router } from "@angular/router";
import { Message } from 'primeng/api';

@Component({
  selector: 'app-email-server-configuration',
  templateUrl: './email-server-configuration.component.html',
  styleUrls: ['./email-server-configuration.component.scss']
})
export class EmailServerConfigurationComponent implements OnInit {
  emailServerInfo: any;
  @Input() display2;
  @Output() showEvent = new EventEmitter();
  @Output() messageEvent = new EventEmitter<any>();
  customMgs: any;
  private formSumitAttempt: boolean;
  msgs: Message[];
  emailServerConfig: FormGroup;

  constructor(public fb: FormBuilder, private _CommonService: CommonService, private router: Router) {
    this.emailServerConfig = this.fb.group({
      smtpServerHost: new FormControl('', Validators.required),
      port: new FormControl('', Validators.required),
      recipientList: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this._CommonService.getMessages().subscribe(
      res => {
        console.log('this.res', res)
        this.customMgs = res;
        console.log('this.customMgs', this.customMgs);
        console.log('this.customMgs', this.customMgs.customMessage.nodename);
      });
  }

  isFieldValidCreate(field: string) {
    return (
      (!this.emailServerConfig.get(field).valid && this.emailServerConfig.get(field).touched) ||
      (this.emailServerConfig.get(field).untouched && this.formSumitAttempt)
    );
  }

  displayFieldCssCreate(field: string) {
    return {
      'has-error': this.isFieldValidCreate(field),
    };
  }

  emailServerConfigSubmit(data) {
    this.emailServerInfo = data;
    console.log('this.emailServerInfo >> ', this.emailServerInfo)
    this.formSumitAttempt = true;

    if (this.emailServerConfig.valid) {

      let params = {
        "smtpServerHost": this.emailServerInfo.smtpServerHost,
        "port": this.emailServerInfo.port,
        "recipientList": this.emailServerInfo.recipientList,
        "username": this.emailServerInfo.username,
        "password": this.emailServerInfo.password
      }

      this._CommonService.emailServerConfig(params).subscribe(data => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Email Server Configuration has created Successfully' });
        console.log('Email Server Configuration has been created...');
        console.log('this.msgs.....>', this.msgs);

        setTimeout((router: Router) => {
          this.router.navigate(["dashboard"]);
        }, 1500);

        this.messageEvent.emit(this.msgs);
        this.showEvent.emit(false);
      },
        error => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: '', detail: 'Email Server Configuration Failed!' });
          console.log('error', error);

        }
      );
    }
  }

  onClose() {
    this.showEvent.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.showEvent.unsubscribe();
  }

}

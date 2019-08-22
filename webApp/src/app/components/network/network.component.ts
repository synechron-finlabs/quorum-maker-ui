import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateNetwork, JoinNetwork } from "../../models/";
import { CommonService } from '../../service/common-service';
import { Router } from "@angular/router";
import { Message } from 'primeng/api';

@Component({
  selector: 'create-and-join',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  customMgs: any;
  createInfo: any;
  JoinInfo: any;
  private formSumitAttempt2: boolean;
  private formSumitAttempt: boolean;
  msgs: Message[];
  CreateNetworkForm: FormGroup;
  JoinNetworkForm: FormGroup;

  constructor(public fb: FormBuilder, private _CommonService: CommonService, private router: Router) {

    this.CreateNetworkForm = this.fb.group({
      nodename: new FormControl('', Validators.required),
      currentIP: new FormControl('', Validators.required),
      rpcPort: new FormControl('', Validators.required),
      whisperPort: new FormControl('', Validators.required),
      constellationPort: new FormControl('', Validators.required),
      raftPort: new FormControl('', Validators.required),
      nodeManagerPort: new FormControl('', Validators.required),
    });

    this.JoinNetworkForm = this.fb.group({
      nodename: new FormControl('', Validators.required),
      currentIP: new FormControl('', Validators.required),
      rpcPort: new FormControl('', Validators.required),
      whisperPort: new FormControl('', Validators.required),
      constellationPort: new FormControl('', Validators.required),
      raftPort: new FormControl('', Validators.required),
      nodeManagerPort: new FormControl('', Validators.required),
      masterNodeManagerPort: new FormControl('', Validators.required),
      masterIP: new FormControl('', Validators.required)
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
      (!this.CreateNetworkForm.get(field).valid && this.CreateNetworkForm.get(field).touched) ||
      (this.CreateNetworkForm.get(field).untouched && this.formSumitAttempt)
    );
  }

  isFieldValidJoin(field: string) {
    return (
      (!this.JoinNetworkForm.get(field).valid && this.JoinNetworkForm.get(field).touched) ||
      (this.JoinNetworkForm.get(field).untouched && this.formSumitAttempt2));
  }

  displayFieldCssCreate(field: string) {
    return {
      'has-error': this.isFieldValidCreate(field),
    };
  }

  displayFieldCssJoin(field: string) {
    return {
      'has-error': this.isFieldValidJoin(field),
    };
  }

  CreateSubmit(data) {
    this.createInfo = data;
    console.log('this.createInfo >> ', this.createInfo)
    this.formSumitAttempt = true;

    if (this.CreateNetworkForm.valid) {

      let params = {
        "nodename": this.createInfo.nodename,
        "currentIP": this.createInfo.currentIP,
        "rpcPort": this.createInfo.rpcPort,
        "whisperPort": this.createInfo.whisperPort,
        "constellationPort": this.createInfo.constellationPort,
        "raftPort": this.createInfo.raftPort,
        "nodeManagerPort": this.createInfo.nodeManagerPort
      }

      this._CommonService.createNetwork(params).subscribe(data => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Network has created successfully' });
        console.log('Network has been created...');
        console.log('this.msgs.....>', this.msgs);

        setTimeout((router: Router) => {
          this.router.navigate(["dashboard"]);
        }, 1500);

      },
        error => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: '', detail: 'Network Creation Failed!' });
          console.log('error', error);

        }
      );
    }

  }

  JoinSubmit(data) {

    this.JoinInfo = data;
    console.log('this.JoinInfo >> ', this.JoinInfo)
    this.formSumitAttempt2 = true;

    if (this.JoinNetworkForm.valid) {

      let params = {
        "nodename": this.JoinInfo.nodename,
        "currentIP": this.JoinInfo.currentIP,
        "rpcPort": this.JoinInfo.rpcPort,
        "whisperPort": this.JoinInfo.whisperPort,
        "constellationPort": this.JoinInfo.constellationPort,
        "raftPort": this.JoinInfo.raftPort,
        "nodeManagerPort": this.JoinInfo.nodeManagerPort,
        "masterNodeManagerPort": this.JoinInfo.masterNodeManagerPort,
        "masterIP": this.JoinInfo.masterIP
      }

      this._CommonService.joinNetwork(params).subscribe(data => {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Network has joined successfully' });
        console.log('Network has joined...');
        console.log('this.msgs.....>', this.msgs);

        setTimeout((router: Router) => {
          this.router.navigate(["dashboard"]);
        }, 1500);

      },
        error => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: '', detail: 'Network joining Failed!' });
          console.log('error', error);

        }
      );
    }
  }

}

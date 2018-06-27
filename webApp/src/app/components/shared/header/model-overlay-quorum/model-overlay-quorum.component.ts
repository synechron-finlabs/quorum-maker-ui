import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../../../service/common-service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { count } from 'rxjs/operator/count';
import { UtilityService } from '../../../../service/utility.service';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-model-overlay-quorum',
  templateUrl: './model-overlay-quorum.component.html',
  styleUrls: ['./model-overlay-quorum.component.scss'],
})

export class ModelOverlayQuorumComponent implements OnInit {
  ShowLoader: any;
  showResponse2: boolean = false;
  showResponse: boolean = true;
  disabled: boolean = true;
  CompileDeployContractForm: FormGroup;
  private formSubmitAttempt: boolean;
  customMgs: any;
  contractInfo: any;
  networkRoleNodeList: any;
  networkRoleNodeListNew = [];
  selectedFileCount: number;
  networkRoleValues: any;
  isNetworkSelected: Boolean = false;
  filesToUpload: Array<File> = [];
  fileUploadResponse: any;
  isResponseReceived: boolean = false;
  msgs: Message[];
  address;
  interface;
  bytecode;
  subscription: Subscription;

  @Input() display: boolean;
  @Output() showOverlay = new EventEmitter();

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public fb: FormBuilder, private _CommonService: CommonService, private router: Router,
    private cd: ChangeDetectorRef, private utilityService: UtilityService) {

    this.CompileDeployContractForm = this.fb.group({
      contractfile: ['', Validators.required],
      networkRole: ['']
    });
  }

  ngOnInit() {
    this._CommonService.getMessages().subscribe(
      res => {
        this.customMgs = res;
      });
    this.getNodeNameList();

    this.subscription = this._CommonService.getCall().subscribe(message => {
      ////console.log('get node name list function called')
      this.getNodeNameList();
    })
  }

  onFileChange(event) {
    this.filesToUpload = [];
    if (event.target.files && event.target.files.length > 0) {
      this.disabled = false;
      this.filesToUpload = event.target.files;
      this.cd.markForCheck();
      //console.log(' this.filesToUpload >>>>>>', this.filesToUpload);
      this.filesToUpload = Object.keys(this.filesToUpload).map(i => this.filesToUpload[i]); // change file list into array of objects
      // this.CompileDeployContractForm.get('chooseFile').setValue(this.filesToUpload );
      //console.log(' this.filesToUpload 123 >>>>>>', this.filesToUpload);
    }

  }

  private prepareSave(): any {
    let input = new FormData();

    input.append('privateFor', this.networkRoleValues);
    this.filesToUpload.forEach((element, index) => {
      input.append("file" + (index + 1), this.filesToUpload[index]); // naming file name as file1,2,3 ...
    })

    input.append('count', String(this.filesToUpload.length));
    input.append('private', String(this.isNetworkSelected));
    return input;
  }

  isFieldValidContract(field: string) {
    return (
      (!this.CompileDeployContractForm.get(field).valid && this.CompileDeployContractForm.get(field).touched) ||
      (this.CompileDeployContractForm.get(field).untouched)
    );
  }

  displayFieldCssContract(field: string) {
    return {
      'has-error': this.isFieldValidContract(field),
    };
  }

  clearFile(fileName) {
    // this.CompileDeployContractForm.get('chooseFile').setValue(null);
    // this.fileInput.nativeElement.files = '';

    this.filesToUpload.forEach((element, index) => {
      if (element.name == fileName) {
        this.filesToUpload.splice(index, 1); // change the original array of selected files
        //console.log("element", element, index);
      }

    });

    if (this.filesToUpload.length == 0) {
      this.disabled = true;
    }

    // //console.log("upload end", this.filesToUpload);
    // //console.log("in clear end", this.fileInput)
  }

  contractSubmit(data) {
    //console.log('submit form data >> ', data)
    this.ShowLoader = true;
    this.contractInfo = data;
    this.networkRoleValues = [];
    this.formSubmitAttempt = true;
    this.isResponseReceived = false;

    if (this.contractInfo && this.contractInfo.networkRole.length > 0) {
      this.isNetworkSelected = true;
      // when all the options selected no need to send values to backend with above key set to true
      if (this.contractInfo.networkRole.length == this.networkRoleNodeList.length) {
        this.networkRoleValues = [];
      }
      else {
        for (let obj of this.contractInfo.networkRole) {
          //console.log(obj)
          this.networkRoleValues.push(obj.publicKey)
        }
        //console.log("this.networkRoleValues", this.networkRoleValues)
      }
    }
    else {
      this.isNetworkSelected = false;
    }

    this.networkRoleValues = this.networkRoleValues.toString();
    const formModel = this.prepareSave(); //  function call to create form data
    console.log(formModel);
    if (this.CompileDeployContractForm.valid) {
      this._CommonService.deployContract(formModel).subscribe(data => {
        this.fileUploadResponse = data.json();
        this.isResponseReceived = true;
        this.ShowLoader = false;

        //console.log('this.fileUploadResponse >>>>>>', this.fileUploadResponse);
        // this.showResponse(this.fileUploadResponse);
        this.msgs = [];
        if (this.fileUploadResponse[0].address == "0x") {
          this.msgs.push({ severity: 'error', summary: 'The contract could not be deployed successfully...' });
        } else {
          this.msgs.push({ severity: 'success', summary: 'Contract has been deployed sucessfully...' });
        }
        // this.display = false;
        // this.showOverlay.emit(false);
        //console.log('Contract has been deployed sucessfully...', this.fileUploadResponse);
        // setTimeout((router: Router) => {
        //   this.router.navigate(["dashboard"]);
        // }, 1500);
      },
        error => {
          //console.log('error', error);
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error...' });
        });
    }

    this.showResponse = false;
    this.showResponse2 = true;

  }

  gotResponse() {
    if (this.fileUploadResponse) {
      this.onClose();
    }

  }

  onClose() {
    //console.log("close function called")
    this.filesToUpload = [];
    this.fileUploadResponse = [];
    this.display = false;
    this.showOverlay.emit(false);
    this.showResponse2 = false;
    this.showResponse = true;
    this.CompileDeployContractForm.reset();
  }

  getNodeNameList() {
    this._CommonService.getNodeNameList().subscribe(result => {
      this.networkRoleNodeList = result.json();
      //console.log('this.networkRoleNodeList >>>>>>', this.networkRoleNodeList);
      this.networkRoleNodeListNew = this.networkRoleNodeList.filter(x => x.self == 'false' && x.active == 'true')
      //console.log('this.networkRoleNodeListNew >>>>>>', this.networkRoleNodeListNew);
      // this.networkRoleNodeListNew =[];
      // this.networkRoleNodeList.forEach(element => {       
      //   if (element.self == 'false') {
      //     this.networkRoleNodeListNew.push(element);
      //   }
      // });
    },
      err => {
        //console.log("Error occured", err);
      }
    );
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.showOverlay.unsubscribe();
  }

}

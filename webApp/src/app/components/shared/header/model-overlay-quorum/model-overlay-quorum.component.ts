import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../../../../service/common-service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { count } from 'rxjs/operator/count';
import { UtilityService } from '../../../../service/utility.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-model-overlay-quorum',
  templateUrl: './model-overlay-quorum.component.html',
  styleUrls: ['./model-overlay-quorum.component.scss'],
})

export class ModelOverlayQuorumComponent implements OnInit {
  CompileDeployContractForm: FormGroup;
  private formSubmitAttempt: boolean;
  customMgs: any;
  contractInfo: any;
  networkRoleNodeList: any;
  selectedFileCount: number;
  networkRoleValues: any;
  isNetworkSelected: Boolean = false;
  filesToUpload: Array<File> = [];
  fileUploadResponse: any;
  msgs: Message[];
  displayValue;
  address;
  interface;
  bytecode;

  @Input() display: boolean;
  @Output() showOverlay = new EventEmitter();

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(public fb: FormBuilder, private _CommonService: CommonService, private router: Router,
    private cd: ChangeDetectorRef, private utilityService: UtilityService) {
    this.CompileDeployContractForm = this.fb.group({
      chooseFile: null,
      networkRole: ['', '']
    });

    this.networkRoleNodeList = [
      { label: 'Wells fargo Node', value: 'oOp0/cdK2/YK8IyUy/74vKp2OMKzlXApXSlGrjAcxHA=' },
      { label: 'ABC Node', value: 'XB6tdKvVBT5e5R+M62mtoIUEPVf2lrPFVgQJLIAtsTM=' },
      { label: 'XYZ Node', value: 'LDN' },
      { label: 'syc Node', value: 'IST' },
    ];
  }

  ngOnInit() {
    this._CommonService.getMessages().subscribe(
      res => {
        this.customMgs = res;
      });
    // this.networkRoleNodeList = this.getNetworkParticipants();
  }
  // below to use when calling the dropdown values from service
  // getNetworkParticipants() {
  //   return this.utilityService.getNetworkRoleNodeList();
  // }

  onFileChange(event) {
    this.filesToUpload = [];
    if (event.target.files.length > 0) {
      this.filesToUpload = <Array<File>>event.target.files;
      this.filesToUpload = Object.keys(this.filesToUpload).map(i => this.filesToUpload[i]); // change file list into array of objects
      // this.CompileDeployContractForm.get('chooseFile').setValue(this.filesToUpload );
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
      (this.CompileDeployContractForm.get(field).untouched && this.formSubmitAttempt)
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
        console.log("element", element, index);
      }
    });
    // console.log("upload end", this.filesToUpload);
    // console.log("in clear end", this.fileInput)
  }

  contractSubmit(data) {
    console.log('submit form data >> ', data)
    this.contractInfo = data;
    this.networkRoleValues = [];
    this.formSubmitAttempt = true;

    if (this.contractInfo.networkRole.length > 0) {
      this.isNetworkSelected = true;
      // when all the options selected no need to send values to backend with above key set to true
      if (this.contractInfo.networkRole.length == this.networkRoleNodeList.length) {
        this.networkRoleValues = [];
      }
      else {
        for (let obj of this.contractInfo.networkRole) {
          this.networkRoleValues.push(obj.value)
        }
      }
    }
    else {
      this.isNetworkSelected = false;
    }
    this.networkRoleValues = this.networkRoleValues.toString();
    const formModel = this.prepareSave(); //  function call to create form data
    if (this.CompileDeployContractForm.valid) {
      this._CommonService.deployContract(formModel).subscribe(data => {
        this.fileUploadResponse = data.json();
        // this.showResponse(this.fileUploadResponse);
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'contract has been deployed Sucessfully...' });
        this.display = false;
        this.showOverlay.emit(false);
        console.log('contract has been deployed Sucessfully...', this.fileUploadResponse);
        // setTimeout((router: Router) => {
        //   this.router.navigate(["dashboard"]);
        // }, 1500);
      },
        error => {
          console.log('error', error);
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'error...' });
        });
    }
  }
  // showResponse(arr) {
  //   for (let val of arr) {
  //     console.log('error', val);
  //     this.address = val.address;
  //     this.interface = val.interface;
  //     this.bytecode = val.bytecode;

  //   }
  //   // resetFilterOnHide
  // }
  onClose() {
    console.log("close function called")
    this.filesToUpload = [];
    this.fileUploadResponse = [];
    this.displayValue = false
    this.display = false;
    this.showOverlay.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.showOverlay.unsubscribe();
  }

}


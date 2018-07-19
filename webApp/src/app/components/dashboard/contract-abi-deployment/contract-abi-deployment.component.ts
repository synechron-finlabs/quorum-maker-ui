import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common-service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-contract-abi-deployment',
  templateUrl: './contract-abi-deployment.component.html',
  styleUrls: ['./contract-abi-deployment.component.scss']
})
export class ContractAbiDeploymentComponent implements OnInit {
  @Input() contractAbiDisplay:boolean;
  @Input() contractAbi;
  @Input() contractFlag;
  @Output() closeEventABI = new EventEmitter();

  deployContractABI: FormGroup;
  display:boolean = false;
  loadingForm:boolean = false;
  filesToUpload:any;
  mesgshow: Message[] = [];
  title: any;
  constructor(public fb: FormBuilder, private _CommonService: CommonService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.createForm();
    //updateContractDetails 
    if(this.contractFlag){
      this.title = "Contract Details";
    } else{
      this.title = "Update/Upload Contract Details";
    }
  }

  createForm(){
    this.deployContractABI = this.fb.group({
      selectFile: ['', Validators.required],
      name: [this.contractAbi.contractName || ''],
      address: [this.contractAbi.contractAddress || ''],
      description: [this.contractAbi.description || '']
    });
  }


  prepareSave(data) {
    let input = new FormData();
    input.append('name', String(data.name));
    input.append('address', String(data.address));
    input.append('description', String(data.description));
    input.append("abi", this.filesToUpload); // naming file name as file1,2,3 ...
    //input.append('private', String(this.isNetworkSelected));
    return input;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.filesToUpload = event.target.files[0];
      this.contractAbi.invalid = false;
      console.log(' this.filesToUpload >>>>>>', this.filesToUpload);
      var fileName = this.filesToUpload.name.substr(0, this.filesToUpload.name.lastIndexOf('.'));
      console.log(fileName);
      this.deployContractABI.controls['name'].setValue(fileName);
  

    }

  }

  onClose() {
    console.log('on close');
    this.mesgshow = [];
    this.closeEventABI.emit({modal: false, msg: null});
    this.filesToUpload = {};
    this.contractAbiDisplay = false;
    this.deployContractABI.reset();
  }

  submitForm(data){
    const formModel = this.prepareSave(data);
    console.log("data>>",data);
    this.loadingForm = true;
    this._CommonService.updateContractDetails(formModel).subscribe(data => {
        console.log(data.json());
        var  response = data.json();
        setTimeout (()=>{
          this.loadingForm = false;
          //this.mesgshow.push({ severity: 'success', summary: response.statusMessage });
          this.contractAbiDisplay = false;
          this.closeEventABI.emit({modal: false, msg: response.statusMessage});
        }, 3000);
      }, err =>{
        console.log(err);
        setTimeout (()=>{
        //this.mesgshow.push({ severity: 'error', summary: 'There is an error in file uploading' });
        this.loadingForm = false;
        this.contractAbiDisplay = false;
        this.closeEventABI.emit({modal: false, msg: 'There is an error in file uploading...'});
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.closeEventABI.unsubscribe();
  }
}

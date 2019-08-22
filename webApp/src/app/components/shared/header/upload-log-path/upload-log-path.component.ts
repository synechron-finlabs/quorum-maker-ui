import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../../../service/common-service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-upload-log-path',
  templateUrl: './upload-log-path.component.html',
  styleUrls: ['./upload-log-path.component.scss']
})
export class UploadLogPathComponent implements OnInit {
  @Input() displayUploadLogs:boolean;
  @Output() closeUploadLogsMsg = new EventEmitter();

  uploadLogsPathForm: FormGroup;
  loadingForm:boolean = false;
  filesToUpload:any;
  isFormSubmitted:boolean = false;
  mesgshow: Message[] = [];
  constructor(public fb: FormBuilder, private _CommonService: CommonService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.uploadLogsPathForm = this.fb.group({
      selectFile: ['', Validators.required],
      gethPath: ['', Validators.required],
      constellationPath: ['', Validators.required]
    });
  }


  prepareSave(data) {
    let input = new FormData();
    input.append('gethPath', String(data.gethPath));
    input.append('constellationPath', String(data.constellationPath));
    input.append("genesis", this.filesToUpload); // naming file gethLogs as file1,2,3 ...
    //input.append('private', String(this.isNetworkSelected));
    return input;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.filesToUpload = event.target.files[0];
     // this.contractAbi.invalid = false;
      console.log(' this.filesToUpload >>>>>>', this.filesToUpload);
    }

  }

  onClose() {
    console.log('on close');
    this.mesgshow = [];
    this.filesToUpload = {};
    this.uploadLogsPathForm.reset();
    this.displayUploadLogs = false;
    if(!this.isFormSubmitted){
      console.log('on close no action');
      this.closeUploadLogsMsg.emit({modal: false, msg: null});
    }
  }

  submitForm(data){
    const formModel = this.prepareSave(data);
    this.isFormSubmitted = true;
    console.log("data>>",data);
    this.loadingForm = true;
    this._CommonService.uploadLogsPath(formModel).subscribe(data => {
        console.log(data.json());
        var  response = data.json();
        setTimeout (()=>{
          this.loadingForm = false;
          this.closeUploadLogsMsg.emit({modal: false, msg: response.statusMessage});
          //this.mesgshow.push({ severity: 'success', summary: response.statusMessage });
          this.displayUploadLogs = false;
        }, 3000);
      }, err =>{
        console.log(err);
        setTimeout (()=>{
        //this.mesgshow.push({ severity: 'error', summary: 'There is an error in file uploading' });
        this.loadingForm = false;
        this.displayUploadLogs = false;
        this.closeUploadLogsMsg.emit({modal: false, msg: 'There is an error in file uploading...'});
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.closeUploadLogsMsg.unsubscribe();
  }
}

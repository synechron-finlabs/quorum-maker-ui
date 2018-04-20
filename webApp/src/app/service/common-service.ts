import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {
  private apiURL = environment.apiURL;
  private messagesUrl = 'assets/data/custom_messages.json';

  constructor(private http: Http) { }

  getMessages() {
    console.log('this.messagesUrl >>>>', this.messagesUrl);
    return this.http.get(this.messagesUrl)
      .map(data => data.json());
  }

  //Retrive the data...
  getBlockData() {
    //console.log('dsdsdsd----', this.apiURL + 'block?' + 'number' + "=" + 5 + "&" + 'reference' + "=" + 5);
    return this.http.get(this.apiURL + 'block?' + 'number' + "=" + 5)

  }

  //Post the createNetwork data...
  createNetwork(params) {
    //  return this.http.post(this.apiURL + 'broker/trade', params);
    //console.log('this.apiURL createNetwork >>>>', this.apiURL + 'createNetwork')
    //console.log('params>>>>---', params);
    //console.log('typeofparams>>>>---', typeof (params));
    return this.http.post(this.apiURL + 'createNetwork', params);
  }

  //Post the joinNetwork data...
  joinNetwork(params) {
    return this.http.post(this.apiURL + 'joinNetwork', params);
  }

  // Retrive the Transaction Details...
  getTransactionDetails(hashId) {
    return this.http.get(this.apiURL + 'txnrcpt/' + { hashId })
      .map(data => data.json());
  }

  // Retrive the Block Details...
  getBlockDetails(BlkNum) {
    console.log('this.apiURL >>>>>..', this.apiURL + 'block/' + BlkNum + '')
    return this.http.get(this.apiURL + 'block/' + BlkNum + '')
      .map(data => data.json());
  }

   // Retrive the transcation Details...
   getTxNDetails(hashKey) {
    console.log('this.apiURL >>>>>..', this.apiURL + 'txnrcpt/' + hashKey + '')
    return this.http.get(this.apiURL + 'txnrcpt/' + hashKey + '')
      .map(data => data.json());
  }
}

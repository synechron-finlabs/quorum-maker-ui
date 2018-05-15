import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {

  private apiURL = environment.apiURL;
  private nodeURL = environment.nodeURL;
  private messagesUrl = 'assets/data/custom_messages.json';
  public showEl: number = 7;


  constructor(private http: Http) { }

  getMessages() {
    console.log('this.messagesUrl >>>>', this.messagesUrl);
    return this.http.get(this.messagesUrl)
      .map(data => data.json());
  }

  //Retrive the data...
  getBlockData(referenceNo) {
    console.log('getBlockData----', this.apiURL + 'block?' + 'number' + "=" + this.showEl + "&" + 'reference' + "=");
    var urlStr = this.apiURL + 'block?' + 'number' + "=" + this.showEl;
    if (referenceNo != null)
      urlStr = urlStr + "&" + 'reference' + "=" + referenceNo
    //return this.http.get(this.apiURL + 'block?' + 'number' + "=" + this.showEl + "&" + 'reference' + "=" + noOfItemsToShowInitially)
    return this.http.get(urlStr);
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

  // Retrive the transcation Details...
  getNodeInfo() {
    console.log('this.nodeURL >>>>>..', this.nodeURL + 'peer')
    return this.http.get(this.nodeURL + 'peer');
  }

  // Retrive the transcation Details...
  getPendingRequest() {
    console.log('this.nodeURL >>>>>..', this.nodeURL + 'pendingJoinRequests')
    return this.http.get(this.nodeURL + 'pendingJoinRequests');
  }

  postjoinNetwork(params) {
    console.log('params', params);
    // const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodeURL + 'joinRequestResponse', params);
  }


  // Retrive the transcation Details...
  getNodeList() {
    console.log('this.apiURL + nodeList >>>>>..', this.apiURL + 'nodeList')
    return this.http.get(this.apiURL + 'nodeList');
  }

  getNodeLatency() {
    console.log('this.apiURL + nodeList >>>>>..', this.apiURL + 'latency')
    return this.http.get(this.apiURL + 'latency');
  }

  peerDetails() {
    console.log('peerDetails----', this.nodeURL + 'peer');
    return this.http.get(this.nodeURL + 'peer');
  }

  nodeDetail(NodeKey) {
    console.log('NodeDetails----', this.nodeURL + 'peer/' + NodeKey + '');
    return this.http.get(this.nodeURL + 'peer/' + NodeKey + '');
  }

  getLatestBlock() {
    console.log('NodeDetails----', this.apiURL + 'latestBlock');
    return this.http.get(this.apiURL + 'latestBlock');
  }

  deployContract(params) {
    console.log('this.apiURL contract deploy >>>>', this.apiURL + 'deployContract')
    return this.http.post(this.apiURL + 'deployContract', params)
  }

  getLogs() {
    console.log('GetLogs----', this.apiURL + 'logs');
    return this.http.get(this.apiURL + 'logs');
  }

  getTxNblocks(hashKey) {
    console.log('txnsearch---', this.apiURL + 'txnsearch/' + hashKey + '');
    return this.http.get(this.apiURL + 'txnsearch/' + hashKey + '')
      .map(data => data.json());
  }

  //Post the createNetwork data...
  emailServerConfig(params) {
    console.log('this.apiURL email server Config >>>>', this.apiURL + 'mailserver')
    // const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiURL + 'mailserver', params);
  }

}



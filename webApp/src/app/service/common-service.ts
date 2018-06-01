import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommonService {

  private nodeURL = environment.nodeURL;
  private messagesUrl = 'assets/data/custom_messages.json';
  public showEl: number = 7;


  constructor(private http: Http) { }

  private actionCalled = new Subject<any>();

  sendCall(message: string) {
    return this.actionCalled.next({ text: message });
  }

  getCall(): Observable<any> {
    return this.actionCalled.asObservable();
  }

  getMessages() {
    console.log('this.messagesUrl >>>>', this.messagesUrl);
    return this.http.get(this.messagesUrl)
      .map(data => data.json());
  }

  //Retrive the data...
  getBlockData(referenceNo) {
    console.log('getBlockData----', this.nodeURL + 'block?' + 'number' + "=" + this.showEl + "&" + 'reference' + "=");
    var urlStr = this.nodeURL + 'block?' + 'number' + "=" + this.showEl;
    if (referenceNo != null)
      urlStr = urlStr + "&" + 'reference' + "=" + referenceNo
    //return this.http.get(this.nodeURL + 'block?' + 'number' + "=" + this.showEl + "&" + 'reference' + "=" + noOfItemsToShowInitially)
    return this.http.get(urlStr);
  }

  //Post the createNetwork data...
  createNetwork(params) {
    //  return this.http.post(this.nodeURL + 'broker/trade', params);
    //console.log('this.nodeURL createNetwork >>>>', this.nodeURL + 'createNetwork')
    //console.log('params>>>>---', params);
    //console.log('typeofparams>>>>---', typeof (params));
    return this.http.post(this.nodeURL + 'createNetwork', params);
  }

  //Post the joinNetwork data...
  joinNetwork(params) {
    return this.http.post(this.nodeURL + 'joinNetwork', params);
  }

  // Retrive the Transaction Details...
  getTransactionDetails(hashId) {
    return this.http.get(this.nodeURL + 'txnrcpt/' + { hashId })
      .map(data => data.json());
  }

  // Retrive the Block Details...
  getBlockDetails(BlkNum) {
    console.log('this.nodeURL >>>>>..', this.nodeURL + 'block/' + BlkNum + '')
    return this.http.get(this.nodeURL + 'block/' + BlkNum + '')
      .map(data => data.json());
  }

  // Retrive the transcation Details...
  getTxNDetails(hashKey) {
    console.log('this.nodeURL >>>>>..', this.nodeURL + 'txnrcpt/' + hashKey + '')
    return this.http.get(this.nodeURL + 'txnrcpt/' + hashKey + '')
      .map(data => data.json());
  }

  // Retrive the transcation Details...
  getNodeInfo() {
    console.log('this.nodeURL >>>>>..', this.nodeURL + 'peer')
    return this.http.get(this.nodeURL + 'peer');
  }

  activeNodeInfo() {
    console.log('this.nodeURL >>>>>..', this.nodeURL + 'activeNodes')
    return this.http.get(this.nodeURL + 'activeNodes');
  }

  // Retrive the transcation Details...
  getPendingRequest() {
    console.log('this.nodeURL >>>>>..', this.nodeURL + 'pendingJoinRequests')
    return this.http.get(this.nodeURL + 'pendingJoinRequests');
  }

  postjoinNetwork(params) {
    console.log('params', params);
    //const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //const options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodeURL + 'joinRequestResponse', params);
  }

  // Retrive the transcation Details...
  getNodeList() {
    console.log('this.nodeURL + nodeList >>>>>..', this.nodeURL + 'getNodeList')
    return this.http.get(this.nodeURL + 'getNodeList');
  }

  getNodeLatency() {
    console.log('this.nodeURL + nodeList >>>>>..', this.nodeURL + 'latency')
    return this.http.get(this.nodeURL + 'latency');
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
    console.log('NodeDetails----', this.nodeURL + 'latestBlock');
    return this.http.get(this.nodeURL + 'latestBlock');
  }

  deployContract(params) {
    console.log('this.nodeURL contract deploy >>>>', this.nodeURL + 'deployContract')
    return this.http.post(this.nodeURL + 'deployContract', params)
  }

  updateNode(params) {
    console.log('updateNode>>>>', params);
    console.log('this.nodeURL updateNode >>>>', this.nodeURL + 'updateNode')
    return this.http.post(this.nodeURL + 'updateNode', params)
  }

  getLogs() {
    console.log('GetLogs----', this.nodeURL + 'logs');
    return this.http.get(this.nodeURL + 'logs');
  }

  getTxNblocks(hashKey) {
    console.log('txnsearch---', this.nodeURL + 'txnsearch/' + hashKey + '');
    return this.http.get(this.nodeURL + 'txnsearch/' + hashKey + '')
      .map(data => data.json());
  }

  //Post the createNetwork data...
  emailServerConfig(params) {
    console.log('this.nodeURL email server Config >>>>', this.nodeURL + 'mailserver')
    // const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // const options = new RequestOptions({ headers: headers });
    return this.http.post(this.nodeURL + 'mailserver', params);
  }

  getNodeNameList() {
    console.log('GetLogs----', this.nodeURL + 'getNodeList');
    return this.http.get(this.nodeURL + 'getNodeList');
  }

}


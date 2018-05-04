import { Injectable } from '@angular/core';


@Injectable()
export class UtilityService {
  networkRoleNodeList: any;
  constructor() {
  }
  getNetworkRoleNodeList() {
    return this.networkRoleNodeList;
  }
}

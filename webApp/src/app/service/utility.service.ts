import { Injectable } from '@angular/core';


@Injectable()
export class UtilityService {
  networkRoleNodeList: any = [];
  serviceCallInterval;
  constructor() {
    this.networkRoleNodeList = [
      { label: 'Synechron', value: 'R1fOFUfzBbSVaXEYecrlo9rENW0dam0kmaA2pasGM14=' },
      { label: 'JPMC', value: 'Er5J8G+jXQA9O2eu7YdhkraYM+j+O5ArnMSZ24PpLQY=' },
      { label: 'NBC', value: 'XB6tdKvVBT5e5R+M62mtoIUEPVf2lrPFVgQJLIAtsTM=' },
    ];

    this.serviceCallInterval = 10; // in seconds

  }

}

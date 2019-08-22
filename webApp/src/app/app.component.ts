import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'app';
  
  //isNode: boolean = true 	// if node is created already(node object present) then change isNode = true;
  isShowHeader: boolean = true;
  constructor(private router: Router) {

    // Only for Production
    // console.log = () => {};
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url === '/create-and-join' || this.router.url === '/') {
          this.isShowHeader = true;
        } else {
          this.isShowHeader = false;
        }
      }
    });
  }
}

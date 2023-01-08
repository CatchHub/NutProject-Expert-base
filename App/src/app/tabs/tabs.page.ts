import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private bool: boolean = false;
  constructor() {}
  getRec() {
    if(this.bool)
   console.log("getRec");
    else
      this.bool = true;
  }

}

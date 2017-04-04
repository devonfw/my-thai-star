import { Injectable } from '@angular/core';

@Injectable()
export class SidenavSharedServiceService {

  opened: boolean = false;

  order: any[] = [];

  bookTableData = {
    invNumber: "",
    date: "",
    hour: "",
    name: "",
    email: "",
    adults: "",
    kids: "",
    acceptedTerms: ""
  }

  public openSideNav(): void {
    this.opened = true;
  }

  public closeSideNav(): void {
    this.opened = false;
  }


}

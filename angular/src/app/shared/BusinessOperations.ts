import { Injectable } from '@angular/core';

@Injectable()
export class BusinessOperations {

  public serverPath: string = '/v1/';

  public getdishes: string =  this.serverPath + 'getdishes';
  public getbookingid: string = this.serverPath + 'getbookingid';

  public postfilters: string = this.serverPath + 'postfilters';
  public postbookingtable: string = this.serverPath + 'postbooking';
  public postbookinginvitation: string = this.serverPath + 'postinvitation';

}

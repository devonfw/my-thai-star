import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable()
export class BusinessOperations {

  public static restServiceRoot: string = config.restServiceRoot;

  // TODO: Re-implement and remove section below
  public serverPath: string = '/v1/';

  public getbookingid: string = this.serverPath + 'getbookingid';

  public postfilters: string = this.serverPath + 'postfilters';
  public postbookingtable: string = this.serverPath + 'postbooking';
  public postbookinginvitation: string = this.serverPath + 'postinvitation';
}

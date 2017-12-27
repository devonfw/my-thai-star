import { Injectable } from '@angular/core';
import { config, authenticationConfig } from '../../config';
import { Http } from '@angular/http';
import { CookieService } from 'app/core/cookieservice/cookie.service';
import {KEYUTIL, KJUR} from 'jsrsasign';
@Injectable()
export class TokenService {
    constructor(
      private http:Http,
    private cookieService:CookieService,
  ){}
   
  
verifyToken():boolean{
    var token=this.cookieService.getCookie("name");
    var date=new Date;
    var sdate =date.getTime().toString().substr(0,10);
    var expdate=JSON.parse(window.atob(token.split('.')[1])).exp
    var nbfdate =JSON.parse(window.atob(token.split('.')[1])).nbf
    
    if (parseInt(sdate)<= expdate && parseInt(sdate)>= nbfdate){
      return true;
    }
    return false;
  }
  
}
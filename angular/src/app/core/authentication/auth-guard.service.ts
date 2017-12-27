import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { SnackBarService } from '../snackService/snackService.service';
import { LoginDataService } from 'app/backend/login/login-data-service';
import { CookieService } from 'app/core/cookieservice/cookie.service';
import { authenticationConfig } from 'app/config';
import { TokenService } from 'app/core/tokenService/token.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public snackBar: SnackBarService,
              private loginDataService:LoginDataService,
              private authService: AuthService,
              private router: Router,
              private cookieService: CookieService,
          private tokenService:TokenService) {}



    relogUser(){
      if(this.cookieService.getCookie("name") != ""){
        var token= this.cookieService.getCookie("name");
        var user:string;
        var role:string;
       if (this.tokenService.verifyToken()==true){    
        this.authService.setToken(token);
        user =JSON.parse(window.atob(token.split('.')[1])).name;
        if(JSON.parse(window.atob(token.split('.')[1])).roles!=undefined){
        
        role = JSON.parse(window.atob(token.split('.')[1])).roles[0].toUpperCase();
        }else{
          role='CUSTOMER';
        }
        this.authService.setLogged(true);
        this.authService.setRole(role);
        this.authService.setUser(user)
      }else{
        this.router.navigate["/restaurant"]
        this.snackBar.openSnack("Session timed out, login again", 4000, 'red');
      }
        }
    }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getUser() === "" ) {
      if (this.authService.getToken()==undefined){
       this.relogUser();
        if (this.authService.isLogged() && this.authService.isPermited('WAITER')) {
          return true;
        }
      
        if (!this.authService.isLogged()) {
          this.snackBar.openSnack("Access denied", 4000, 'red');
        }
  
        if (this.router.url.substring(0,14) === '/loginCallback') {
          this.router.navigate(['/restaurant']);
        }
        if (this.router.url=== '/') {
  
          this.router.navigate(['/restaurant']);
        }
      }
      }else{

      if (this.authService.isLogged() && this.authService.isPermited('WAITER')) {
        return true;
      }
    
      if (!this.authService.isLogged()) {
        this.snackBar.openSnack("Access denied", 4000, 'red');
      }

      if (this.router.url.substring(0,14) === '/loginCallback') {
        this.router.navigate(['/restaurant']);
      }
      if (this.router.url=== '/') {

        this.router.navigate(['/restaurant']);
      }
      return false;
        
      }
     
    }    


   
      
    
       
          

   
  
  }


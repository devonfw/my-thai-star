import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { AuthService } from '../core/authentication/auth.service';
import { SidenavService } from '../sidenav/shared/sidenav.service';
import { UserAreaService } from '../user-area/shared/user-area.service';
import { WindowService } from '../core/windowService/windowService.service';
import { LoginDataService } from '../backend/login/login-data-service';
import { TwitterDialogComponent } from '../user-area/twitter-dialog/twitter-dialog.component';
import { authenticationConfig} from '../config';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'app/core/cookieservice/cookie.service';
import { TokenService } from 'app/core/tokenService/token.service';

@Component({
  selector: 'public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Output('openCloseSidenavMobile') sidenavNavigationEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public window: WindowService,
              public router: Router,
              public sidenav: SidenavService,
              public dialog: MatDialog,
              public auth: AuthService,
              public userService: UserAreaService,
              public loginDataService: LoginDataService,
              public cookieService:CookieService,
              public tokenService:TokenService,
            ) {      
              
  }
 
  openCloseSideNav(sidenavOpened: boolean): void {
    sidenavOpened ? this.sidenav.closeSideNav() : this.sidenav.openSideNav();
  }

  openCloseNavigationSideNav(): void {
    this.sidenavNavigationEmitter.emit();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.sidenavNavigationEmitter.emit();
  }


  triggerLogin(): void {      
    let loginEndpoint="https://login.microsoftonline.com/" +authenticationConfig.domain+"/oauth2/v2.0/authorize?p="+ authenticationConfig.signin_po+"&client_id="+authenticationConfig.signin_id+"&nonce=defaultNonce&redirect_uri="+authenticationConfig.redirect_uri+"&scope=openid&response_type=id_token&prompt=login";                  
     window.location.href = loginEndpoint;

}

  employeeLogin():void{
    let loginEndpoint="https://login.microsoftonline.com/"+authenticationConfig.domain+"/oauth2/authorize?client_id="+authenticationConfig.client_id+"&response_type=id_token+token&response_mode=fragment&scope=openid%20https%3A%2F%2Fgraph.microsoft.com&nonce=7362CAEA-9CA5-4B43-9BA3-34D7C303EBA7&state=12345&redirect_uri="+authenticationConfig.redirect_uri+"&resource=https://graph.windows.net/";
    window.location.href = loginEndpoint;
      }   

  Signup(): void {
   let url= "https://login.microsoftonline.com/"+authenticationConfig.domain+"/oauth2/v2.0/authorize?p="+authenticationConfig.signup_po+"&client_id="+authenticationConfig.signin_id+"&nonce=defaultNonce&redirect_uri="+authenticationConfig.redirect_uri+"&scope=openid&response_type=id_token&prompt=login";
   window.location.href = url;
  }

  editProfile(){
   let url="https://login.microsoftonline.com/"+ authenticationConfig.domain+"/oauth2/v2.0/authorize?p="+authenticationConfig.editprofile+"&client_id="+authenticationConfig.signin_id+"&nonce=defaultNonce&redirect_uri="+authenticationConfig.redirect_uri+"&scope=openid&response_type=id_token&prompt=login";
  window.location.href= url;
  }

  resetPass(): void {
  let url= "https://login.microsoftonline.com/"+authenticationConfig.domain+"/oauth2/v2.0/authorize?p="+authenticationConfig.reset_po+"&client_id="+authenticationConfig.signin_id+"&nonce=defaultNonce&redirect_uri="+authenticationConfig.redirect_uri+"&scope=openid&response_type=id_token&prompt=login";
  window.location.href=url;
  
  }


  logout(): void {
      let logoutEndpoint="https://login.microsoftonline.com/"+"common"+"/oauth2/logout?post_logout_redirect_uri="+authenticationConfig.redirect_uri;
      window.location.href =logoutEndpoint;
      this.userService.logout();
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
  }
}

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { LoginDataService } from '../backend/login/login-data-service';
import { SnackBarService } from '../core/snackService/snackService.service';
import { AuthService } from '../core/authentication/auth.service';
import { CookieService } from 'app/core/cookieservice/cookie.service';
import { authenticationConfig} from '../config';
import { Observable } from 'rxjs/Observable';
import { getComponentViewDefinitionFactory } from '@angular/core/src/view/refs';
import { AuthGuardService } from 'app/core/authentication/auth-guard.service';
@Component({
  selector: 'public-home',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss'],
})
export class LoginCallbackComponent {
	
  constructor(private router: Router, 
		private route: ActivatedRoute,
		public snackBar: SnackBarService,
    public authService: AuthService,
		public loginDataService: LoginDataService,
		public cookieService: CookieService,
	private authguard:AuthGuardService) {

			let paramMap = {};
			if (this.route.snapshot.fragment!= null){
			this.route.fragment.subscribe((fragment: string) => {
					if (this.route.snapshot.url[0].path === "loginCallback") {
						let keyValuePairs = fragment.split('&');
						keyValuePairs.forEach(kvPair => {
							let pair = kvPair.split('=');
							let key = pair[0];
							let value = pair[1];
							paramMap[key] = value;
						});
					}
				});
				var token=""
			if(this.cookieService.getCookie("name")==""){	
			token=paramMap["id_token"];
			this.authService.setToken(token);
			this.loginDataService.getCurrentUser()
				.subscribe((loginInfo: any) => {
					this.authService.setLogged(true);
					if(JSON.parse(window.atob(token.split('.')[1])).roles!=undefined){
						this.authService.setRole(JSON.parse(window.atob(token.split('.')[1])).roles[0].toUpperCase());
						}else{
							this.authService.setRole('CUSTOMER');
						}
					this.authService.setUser(loginInfo.name);
					this.cookieService.setCookie("name",token,JSON.parse(window.atob(token.split('.')[1])).exp-JSON.parse(window.atob(token.split('.')[1])).nbf);
					this.router.navigate(['orders']);
					this.snackBar.openSnack('Login successful', 4000, 'green');
				}, (err: any) => {
					this.snackBar.openSnack(err.message, 4000, 'red');
				});
			}else{
				this.authguard.relogUser();
				this.router.navigate(['restaurant']);	
			}
			}else{
				this.router.navigate(['restaurant']);	
			}
		  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CookieService } from 'app/core/cookieservice/cookie.service';
import { AuthService } from 'app/core/authentication/auth.service';
import { LoginDataService } from 'app/backend/login/login-data-service';
import { AuthGuardService } from 'app/core/authentication/auth-guard.service';

@Component({
  selector: 'public-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(private router: Router,
            private cookieService:CookieService,
          private authService:AuthService,
        private loginDataService:LoginDataService,
          private authguard:AuthGuardService) {
  }

ngOnInit(): void{
  if (this.authService.getToken()==undefined){
    this.authguard.relogUser();
  }
}
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}

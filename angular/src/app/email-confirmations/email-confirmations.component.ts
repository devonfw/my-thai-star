import { SnackBarService } from '../shared/snackService/snackService.service';
import { UrlSegment } from '@angular/router/router';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'public-email-confirmations',
  templateUrl: './email-confirmations.component.html',
  styleUrls: ['./email-confirmations.component.scss'],
})
export class EmailConfirmationsComponent implements OnInit {

  constructor(private snackBarService: SnackBarService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => params['token'])
        .subscribe((token: string) => {
           this.route.url
               .subscribe((data: UrlSegment[]) => {
                  switch (data[1].path) {
                    case 'accept':
                      console.log("acepted" + token);
                      this.snackBarService.openSnack('Acepted!', 4000, 'green');
                      break;
                    case 'refuse':
                      console.log("refused" + token);
                      this.snackBarService.openSnack('Refused!', 4000, 'black');
                      break;
                    default:
                      this.snackBarService.openSnack('Url not found, please try again', 4000, 'green');
                      break;
                  }
               });
        });
    this.router.navigate(['restaurant']);
  }

}

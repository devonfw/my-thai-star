import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class BookTableEffects {

  constructor(
    public translate: TranslateService,
  ) {}
}


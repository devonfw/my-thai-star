import { Injectable } from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {AuthActions, AuthActionTypes} from '../../user-area/store/actions/auth.actions';
import {filter, map, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Injectable()
export class AppEffects {


  constructor(private actions$: Actions<AuthActions>) {}
}

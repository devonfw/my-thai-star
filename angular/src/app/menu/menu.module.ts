import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuService } from './services/menu.service';

import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { MenuComponent } from './container/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MenuFiltersComponent } from './components/menu-filters/menu-filters.component';
import { FilterSearchComponent } from './components/menu-filters/filter-search/filter-search.component';
import { FilterSortComponent } from './components/menu-filters/filter-sort/filter-sort.component';
import { FilterCheckboxesComponent } from './components/menu-filters/filter-checkboxes/filter-checkboxes.component';
import { MenuCardCommentsComponent } from './components/menu-card/menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from './components/menu-card/menu-card-details/menu-card-details.component';
import { StoreModule } from '@ngrx/store';
import * as fromMenu from './store/reducers/menu.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './store/effects/menu.effects';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('menu', fromMenu.reducer),
    EffectsModule.forFeature([MenuEffects]),
  ],
  providers: [
    MenuService,
  ],
  declarations: [
    MenuComponent,
    MenuCardComponent,
    MenuFiltersComponent,
    FilterSearchComponent,
    FilterSortComponent,
    FilterCheckboxesComponent,
    MenuCardCommentsComponent,
    MenuCardDetailsComponent,
  ],
  exports: [
    MenuComponent,
  ],
  entryComponents: [
  ],
})
export class MenuModule { }

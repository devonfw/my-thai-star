import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { MenuCardCommentsComponent } from './components/menu-card/menu-card-comments/menu-card-comments.component';
import { MenuCardDetailsComponent } from './components/menu-card/menu-card-details/menu-card-details.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { FilterCheckboxesComponent } from './components/menu-filters/filter-checkboxes/filter-checkboxes.component';
import { FilterSearchComponent } from './components/menu-filters/filter-search/filter-search.component';
import { FilterSortComponent } from './components/menu-filters/filter-sort/filter-sort.component';
import { MenuFiltersComponent } from './components/menu-filters/menu-filters.component';
import { MenuComponent } from './container/menu.component';
import { MenuService } from './services/menu.service';
import { effects, reducers } from './store';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        TranslocoModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('menu', reducers),
        EffectsModule.forFeature(effects),
    ],
    providers: [MenuService],
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
    exports: [MenuComponent]
})
export class MenuModule {}

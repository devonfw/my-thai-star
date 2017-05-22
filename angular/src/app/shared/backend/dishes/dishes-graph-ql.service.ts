import { Filter } from './filter';
import { ApolloQueryResult } from 'apollo-client';
import { IDishesDataService } from './dishes-data-service-interface';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Dish } from './dish';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import 'rxjs/add/operator/map';

// We use the gql tag to parse our query string into a query document
const getDishesQuery: any = gql`
  query getDishes {
    dishes {
      name
      description
      image
      likes
      ingredients {
        price
        name
      }
      price
    }
  }
`;

// TODO: This is a temporary type as graphQL backend was developed in parallel to angular app
// and java server implementation, model was not yet established so for now conversion
// will be implemented as a part of this service to expose consistient service API
class GqlDish {
    image: string;
    likes: number;
    ingredients: {name: string, price: number}[];
    description: string;
    name: string;
    price: number;
    categories: { // added by Roberto, please, revise
      main: boolean,
      starter: boolean,
      dessert: boolean,
      noodle: boolean,
      rice: boolean,
      curry: boolean,
      vegan: boolean,
      vegetarian: boolean,
    };
}

class DishesQueryRepsonse {
  dishes: GqlDish[];
}

@Injectable()
export class DishesGraphQlService implements IDishesDataService {

  private apollo: Apollo;

  constructor(private injector: Injector) {
    this.apollo = injector.get(Apollo);
  }

  get(): Observable <Dish[]> {
    return this.apollo.watchQuery<DishesQueryRepsonse>({ query: getDishesQuery })
      .map((result: ApolloQueryResult<DishesQueryRepsonse>) => result.data.dishes)
      .map((dishes: GqlDish[]) => dishes.map(this.convertToBackendDish));
  }

  // added by Roberto, please, revise
  filter(filters: Filter): Observable <Dish[]> {
    return this.apollo.watchQuery<DishesQueryRepsonse>({ query: getDishesQuery })
      .map((result: ApolloQueryResult<DishesQueryRepsonse>) => result.data.dishes)
      .map((dishes: GqlDish[]) => dishes.map(this.convertToBackendDish));
  }

  // TODO: see the comment above
  private convertToBackendDish(dish: GqlDish): Dish {
   return {
        isfav: false,
        image: dish.image,
        likes: dish.likes,
        extras: dish.ingredients.map((extra: any) => ({name: extra.name, price: extra.price, selected: false})),
        description: dish.description,
        name: dish.name,
        price: dish.price,
        categories: { // added by Roberto, please, revise
          main: dish.categories.main,
          starter: dish.categories.main,
          dessert: dish.categories.main,
          noodle: dish.categories.main,
          rice: dish.categories.main,
          curry: dish.categories.main,
          vegan: dish.categories.main,
          vegetarian: dish.categories.main,
      },
      };
  }
}

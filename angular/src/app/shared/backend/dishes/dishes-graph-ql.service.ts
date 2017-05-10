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

  // TODO: see the comment above
  private convertToBackendDish(dish: GqlDish): Dish {
   return {
        favourite: false,
        image: dish.image,
        likes: dish.likes,
        options: dish.ingredients.map((extra: any) => ({name: extra.name, price: extra.price, selected: false})),
        orderDescription: dish.description,
        orderName: dish.name,
        price: dish.price,
      };
  }
}

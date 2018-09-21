import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { OrdersData } from '../../shared/viewModels/interfaces';
import { PredictionCriteria, FilterOrdersCockpit } from 'app/shared/backendModels/interfaces';
import { OrderResponse } from '../../shared/viewModels/interfaces';

@Injectable()
export class PredictionService {

  private readonly predictionRestPath: string = 'predictionmanagement/v1/nextweek';
  private readonly getOrdereddishesRestPath: string = 'ordermanagement/v1/ordereddishes/history';

  constructor(private http: HttpClient) { }

  getPrediction(predictionCriteria: PredictionCriteria): Observable<OrdersData> {

    return this.http.post(`${environment.restServiceRoot}${this.predictionRestPath}`, predictionCriteria)
      .pipe(map((res: any) => {
        let startDate = Date.parse(predictionCriteria.startBookingdate);
        let { data } = res.predictionData;
        let dishes = data.reduce((acc, row) => {
          acc[row.dishId] = row.dishName;
          return acc;
        }, {});

        return {
          dates: Array(7).fill(null)
            .map((_, i) => {
              let result = new Date(startDate);
              result.setDate(result.getDate() + i);
              return result;
            }),
          holidays: predictionCriteria.holidays,
          weather: predictionCriteria.temperatures.map(x => +x),
          dishes: Object.keys(dishes)
            .map(id => ({
              id: +id,
              name: dishes[id],
              orders: data
                .filter(row => row.dishId === +id)
                .sort((x, y) => x.timestamp - y.timestamp)
                .map(row => Math.max(row.forecast, 0))
            }))
            .sort((x, y) => x.id - y.id)
        };
      }));
  }

  getOrders(filters: FilterOrdersCockpit): Observable<OrdersData> {
    let orders = { dates: [], dishes: [], weather: [], holidays: [] };

    return this.http.post(`${environment.restServiceRoot}${this.getOrdereddishesRestPath}`, filters)
      .pipe(map((data: any) => {
        data.result.forEach(record => {
          let dish = orders.dishes.filter(dish => dish.id === record.dish.id);

          if (dish.length === 0) {
            orders.dishes.push({
              id: record.dish.id,
              name: record.dish.name,
              orders: [record.orderedDishes.amount],
            });
          } else {
            dish[0].orders.push(record.orderedDishes.amount);
          }

          let date = orders.dates.filter(date => date.toLocaleDateString('en-GB') == (new Date(record.orderedDishes.bookingdate)).toLocaleDateString('en-GB'));

          if (date.length === 0) {
            orders.dates.push(new Date(record.orderedDishes.bookingdate));
            orders.weather.push(record.orderedDishes.temperature);
            orders.holidays.push(record.orderedDishes.designation);
          }
      });

      // sort the orders
      orders.dishes.sort((x, y) => x.id - y.id);
      
      var metadata = [];
      for (var i = 0; i < orders.dates.length; i++) { 
        metadata.push({'date': orders.dates[i], 'weather': orders.weather[i], 'holiday': orders.holidays[i]});
      }

      metadata.sort((x, y) => x.date - y.date);

      for (var i = 0; i < metadata.length; i++) {
        orders.dates[i] = metadata[i].date;
        orders.weather[i] = metadata[i].weather;
        orders.holidays[i] = metadata[i].holiday;
      }
      return orders;
    }));
  }
}

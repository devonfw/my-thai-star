import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FilterOrdersCockpit,
  PredictionCriteria,
} from 'app/shared/backend-models/interfaces';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { ConfigService } from '../../core/config/config.service';
import { OrdersData } from '../../shared/view-models/interfaces';

@Injectable()
export class PredictionService {
  private readonly predictionRestPath: string =
    'predictionmanagement/v1/nextweek';
  private readonly getOrdereddishesRestPath: string =
    'ordermanagement/v1/ordereddishes/history';

  private readonly restServiceRoot$: Observable<
    string
  > = this.config.getRestServiceRoot();

  constructor(private http: HttpClient, private config: ConfigService) {}

  getPrediction(
    predictionCriteria: PredictionCriteria,
  ): Observable<OrdersData> {
    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http
          .post(
            `${restServiceRoot}${this.predictionRestPath}`,
            predictionCriteria,
          )
          .pipe(
            map((res: any) => {
              const startDate = Date.parse(predictionCriteria.startBookingdate);
              const { data } = res;
              const dishes = data.reduce((acc, row) => {
                acc[row.dishId] = row.dishName;
                return acc;
              }, {});

              return {
                dates: Array(7)
                  .fill(null)
                  .map((_, i) => {
                    const result = new Date(startDate);
                    result.setDate(result.getDate() + i);
                    return result;
                  }),
                holidays: predictionCriteria.holidays,
                weather: predictionCriteria.temperatures.map((x) => +x),
                dishes: Object.keys(dishes)
                  .map((id) => ({
                    id: +id,
                    name: dishes[id],
                    orders: data
                      .filter((row) => row.dishId === +id)
                      .sort((x, y) => x.timestamp - y.timestamp)
                      .map((row) => Math.max(row.forecast, 0)),
                  }))
                  .sort((x, y) => x.id - y.id),
              };
            }),
          ),
      ),
    );
  }

  getOrders(filters: FilterOrdersCockpit): Observable<OrdersData> {
    const orders = { dates: [], dishes: [], weather: [], holidays: [] };

    return this.restServiceRoot$.pipe(
      exhaustMap((restServiceRoot) =>
        this.http
          .post(`${restServiceRoot}${this.getOrdereddishesRestPath}`, filters)
          .pipe(
            map((data: any) => {
              data.content.forEach((record) => {
                const dish = orders.dishes.filter(
                  (value) => value.id === record.dish.id,
                );

                if (dish.length === 0) {
                  orders.dishes.push({
                    id: record.dish.id,
                    name: record.dish.name,
                    orders: [record.orderedDishes.amount],
                  });
                } else {
                  dish[0].orders.push(record.orderedDishes.amount);
                }

                const date = orders.dates.filter(
                  (value) =>
                    value.toLocaleDateString('en-GB') ===
                    new Date(
                      record.orderedDishes.bookingdate,
                    ).toLocaleDateString('en-GB'),
                );

                if (date.length === 0) {
                  orders.dates.push(new Date(record.orderedDishes.bookingdate));
                  orders.weather.push(record.orderedDishes.temperature);
                  orders.holidays.push(record.orderedDishes.designation);
                }
              });

              // sort the orders
              orders.dishes.sort((x, y) => x.id - y.id);

              const metadata = orders.dates.reduce((accum, date, index) => {
                accum.push({
                  date,
                  weather: orders.weather[index],
                  holiday: orders.holidays[index],
                });
                return accum;
              }, []);

              metadata.sort((x, y) => x.date - y.date);

              metadata.forEach((value, index) => {
                orders.dates[index] = data.date;
                orders.weather[index] = data.weather;
                orders.holidays[index] = data.holiday;
              });

              return orders;
            }),
          ),
      ),
    );
  }
}

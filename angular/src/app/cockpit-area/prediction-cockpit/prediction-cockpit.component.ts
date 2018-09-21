import { PredictionService } from '../shared/prediction.service';
import { OrdersData } from '../../shared/viewModels/interfaces';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { config } from '../../config';
import { ITdDataTableColumn } from '@covalent/core';
import { PredictionCriteria, FilterOrdersCockpit } from 'app/shared/backendModels/interfaces';
import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cockpit-prediction-cockpit',
  templateUrl: './prediction-cockpit.component.html',
  styleUrls: ['./prediction-cockpit.component.scss'],
})

export class PredictionCockpitComponent implements OnInit {
  @ViewChild('dailyChart') dailyChart: ElementRef;
  @ViewChild('monthlyChart') monthlyChart: ElementRef;
  @ViewChild('predictionChart') predictionChart: ElementRef;

  triggerPredictionId;

  dailyChartCanvas: any;
  monthlyChartCanvas: any;
  predictionChartCanvas: any;

  currentStartDate = new FormControl(new Date());
  currentEndDate = new FormControl(new Date());
  predictionFilter: PredictionCriteria = {
    type: 'prediction',
    startBookingdate: new Date(this.currentStartDate.value.getFullYear(), this.currentStartDate.value.getMonth(), this.currentStartDate.value.getDate()).toISOString(),
    temperatures: [22.2, 24.8, 26.7, 22, 23.1, 23, 20.8],
    holidays: Array(7).fill(null).map((x, i) => i !== 4 ? x : 'Holiday!')
  };
  dailyFilter: FilterOrdersCockpit = {
    type: 'daily',
    startBookingdate: new Date(this.currentStartDate.value.getFullYear(), this.currentStartDate.value.getMonth(), this.currentStartDate.value.getDate() - 7).toISOString(),
    endBookingdate: new Date(this.currentEndDate.value.getFullYear(), this.currentEndDate.value.getMonth(), this.currentEndDate.value.getDate() - 1).toISOString()
  };
  monthlyFilter: FilterOrdersCockpit = {
    type: 'monthly',
    startBookingdate: new Date(this.currentStartDate.value.getFullYear(), this.currentStartDate.value.getMonth() - 12, 1).toISOString(),
    endBookingdate: new Date().toISOString()
  };

  predictionBusy = false;
  dailyBusy = false;
  monthlyBusy = false;

  editPredictionDayIndex = 0;

  constructor(private predictionService: PredictionService) { }

  ngOnInit(): void {
    this.fetchOrders(this.predictionFilter);
    this.fetchOrders(this.dailyFilter);
    this.fetchOrders(this.monthlyFilter);
  }

  colorGenerator(size: number): { r: number, g: number, b: number }[] {
    let hs = Array(size).fill(0).map((_, i) => i / size);
    let s = .5;
    let v = .9;
    let p = v * (1 - s);

    return hs.map(h => {
      let r, g, b;
      let i = Math.floor(h * 6);
      let f = h * 6 - i;
      let q = v * (1 - f * s);
      let t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
      };
    });
  }

  updateGraphClick(evt: any) {
    return this.fetchOrders(
      evt.currentTarget.dataset.type === "daily"
        ? this.dailyFilter
        : this.monthlyFilter
    );
  }

  fetchOrders(filter: FilterOrdersCockpit | PredictionCriteria) {
    let data = [];
    let labels = [];

    if (filter.type === 'prediction') {
      this.predictionBusy = true;
    } else if (filter.type === 'daily') {
      this.dailyBusy = true;
    } else if (filter.type === 'monthly') {
      this.monthlyBusy = true;
    }

    let json = JSON.stringify(filter);
    let observable = filter.type === 'prediction'
      ? this.predictionService.getPrediction(filter as PredictionCriteria)
      : this.predictionService.getOrders(filter as FilterOrdersCockpit);

    observable.subscribe((orders) => {
      if (json !== JSON.stringify(filter)) {
        return;
      }

      orders.dishes.forEach(record => {
        data.push({
          type: 'line',
          fill: false,
          data: record.orders,
          label: record.name,
          cubicInterpolationMode: 'monotone'
        });
      });

      //we need color generator for number of dishes we have,
      let colors = this.colorGenerator(orders.dishes.length);
      data.forEach((record, index) => {
        let color = colors[index]
        record.backgroundColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',0.2)';
        record.backgroundColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',0.2)';
        record.borderColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',1)';
        record.pointBackgroundColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',1)';
        record.pointBorderColor = '#fff';
        record.pointHoverBackgroundColor = '#fff';
        record.pointHoverBorderColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',0.8)';
      });

      switch (filter.type) {
        case 'monthly':
          labels = orders.dates.map((date, index) => {
            return [date.toLocaleDateString('en-GB', { month: "short" })];
          });
          break;
        case 'daily':
        case 'prediction':
          labels = orders.dates.map((date, index) => {
            return [
              date.toLocaleDateString('en-GB', { weekday: "short" }) + ' ' + date.toLocaleDateString('en-GB'),
              orders.weather[index] + '°C'
            ];
          });
          break;
      }

      if (filter.type === 'daily' || filter.type === 'prediction') {
        //get the max value of all orders to set it as value of holiday bar
        let max = Math.ceil(Math.max(...data.map(record => Math.max(...record.data))) / 10) * 10;
        let weekHolidays = orders.holidays.map((record, index) => {
          return record ? max : 0;
        });
        data.push({
          type: 'bar',
          fill: true,
          data: weekHolidays,
          label: 'holiday',
          designation: orders.holidays,
          backgroundColor: 'rgba(0,100,0,0.1)'
        });
      }

      let chartCanvas: any;
      let ctx: any;

      switch (filter.type) {
        case 'monthly':
          chartCanvas = this.monthlyChartCanvas;
          break;
        case 'daily':
          chartCanvas = this.dailyChartCanvas;
          break;
        case 'prediction':
          chartCanvas = this.predictionChartCanvas;
          break;
      }

      if (chartCanvas) {
        chartCanvas.data.labels = labels;
        chartCanvas.data.datasets.forEach((entry, i) => {
          Object.assign(entry, data[i]);
        });
        chartCanvas.update();
      } else {
        let config = chartCanvas = {
          type: 'bar',
          data: {
            labels: labels,
            datasets: data
          },
          options: {
            responsive: true,
            hover: {
              animationDuration: 0
            },
            legend: {
              display: true,
              labels: {
                filter: (dataLabel, chart) => {
                  if (dataLabel.text !== "holiday") {
                    return dataLabel;
                  }
                },
              }
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem, data) => {
                  let orders = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  let ordersLabel = Math.round(orders * 10) / 10 + ' order' + (orders !== 1 ? 's' : '');

                  switch (filter.type) {
                    case 'monthly':
                      return ordersLabel;
                    case 'daily':
                    case 'prediction':
                      if (data.datasets[tooltipItem.datasetIndex].designation) {
                        return data.datasets[tooltipItem.datasetIndex].designation[tooltipItem.index];
                      }

                      return ordersLabel;
                  }
                }
              }
            },
          }
        }
        switch (filter.type) {
          case 'monthly':
            ctx = this.monthlyChart.nativeElement.getContext('2d');
            this.monthlyChartCanvas = new Chart(ctx, config);
            break;
          case 'daily':
            ctx = this.dailyChart.nativeElement.getContext('2d');
            this.dailyChartCanvas = new Chart(ctx, config);
            break;
          case 'prediction':
            ctx = this.predictionChart.nativeElement.getContext('2d');
            this.predictionChartCanvas = new Chart(ctx, config);
            break;
        }
      }

      if (filter.type === 'prediction') {
        this.predictionBusy = false;
      } else if (filter.type === 'daily') {
        this.dailyBusy = false;
      } else if (filter.type === 'monthly') {
        this.monthlyBusy = false;
      }
    });
  }

  triggerPrediction() {
    clearTimeout(this.triggerPredictionId);

    this.triggerPredictionId = setTimeout(() => {
      this.fetchOrders(this.predictionFilter);
    }, 500);
  }

  getEditPredictionDayLabel() {
    let date = new Date(this.currentStartDate.value.getFullYear(), this.currentStartDate.value.getMonth(), this.currentStartDate.value.getDate() + this.editPredictionDayIndex);

    return date.toLocaleDateString('en-GB', { weekday: "short" }) + ' ' + date.toLocaleDateString('en-GB');
  }
  
  monthlyCalendarYearHandler( calendarDate: Moment, filterType: String ) {
    if (filterType === "start") {
      var dateValue = this.currentStartDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setDate(1);
      this.currentStartDate.setValue(dateValue);
      this.monthlyFilter.startBookingdate = new Date(this.currentStartDate.value.getFullYear(), this.currentStartDate.value.getMonth(), 1).toISOString();
    }
    else if (filterType === "end") {
      var dateValue = this.currentEndDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setDate(1);
      this.currentEndDate.setValue(dateValue);
      this.monthlyFilter.endBookingdate = new Date(this.currentEndDate.value.getFullYear(), this.currentEndDate.value.getMonth(), 1).toISOString();
    }
  }

  monthlyCalendarMonthHandler( calendarDate: Moment, filterType: String, datepicker: OwlDateTimeComponent<Moment> ) {

    if (filterType === "start") {
      var dateValue = this.currentStartDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setMonth(calendarDate.month());
      dateValue.setDate(1);
      this.currentStartDate.setValue(dateValue);
      this.monthlyFilter.startBookingdate = new Date(this.currentStartDate.value.getFullYear(), this.currentStartDate.value.getMonth(), 1).toISOString();
    }
    else if (filterType === "end") {
      var dateValue = this.currentEndDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setMonth(calendarDate.month());
      dateValue.setDate(1);
      this.currentEndDate.setValue(dateValue);
      this.monthlyFilter.endBookingdate = new Date(this.currentEndDate.value.getFullYear(), this.currentEndDate.value.getMonth(), 1).toISOString();
    }
    datepicker.close();
  }
}

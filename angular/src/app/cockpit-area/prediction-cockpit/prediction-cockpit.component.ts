import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  FilterOrdersCockpit,
  PredictionCriteria,
} from '../../shared/backend-models/interfaces';
import { Chart } from 'chart.js';
import { Moment } from 'moment';
import { OwlDateTimeComponent } from '@busacca/ng-pick-datetime';
import { PredictionService } from '../services/prediction.service';

@Component({
  selector: 'app-cockpit-prediction-cockpit',
  templateUrl: './prediction-cockpit.component.html',
  styleUrls: ['./prediction-cockpit.component.scss'],
})
export class PredictionCockpitComponent implements OnInit {
  @ViewChild('dailyChart', { static: true }) dailyChart: ElementRef;
  @ViewChild('monthlyChart', { static: true }) monthlyChart: ElementRef;
  @ViewChild('predictionChart', { static: true }) predictionChart: ElementRef;

  triggerPredictionId;

  dailyChartCanvas: Chart;
  monthlyChartCanvas: Chart;
  predictionChartCanvas: Chart;

  currentStartDate = new FormControl(new Date());
  currentEndDate = new FormControl(new Date());
  predictionFilter: PredictionCriteria = {
    pageable: {
      pageSize: 10000,
      pageNumber: 0,
      sort: [
        {
          property: 'timestamp',
          direction: 'ASC',
        },
      ],
    },
    type: 'prediction',
    startBookingdate: new Date(
      this.currentStartDate.value.getFullYear(),
      this.currentStartDate.value.getMonth(),
      this.currentStartDate.value.getDate(),
    ).toISOString(),
    temperatures: [22.2, 24.8, 26.7, 22, 23.1, 23, 20.8],
    holidays: Array(7)
      .fill(null)
      .map((x, i) => (i !== 4 ? x : 'Holiday!')),
  };
  dailyFilter: FilterOrdersCockpit = {
    pageable: {
      pageSize: 10000,
      pageNumber: 0,
      sort: [
        {
          property: 'bookingdate',
          direction: 'ASC',
        },
      ],
    },
    type: 'daily',
    startBookingdate: new Date(
      this.currentStartDate.value.getFullYear(),
      this.currentStartDate.value.getMonth(),
      this.currentStartDate.value.getDate() - 7,
    ).toISOString(),
    endBookingdate: new Date(
      this.currentEndDate.value.getFullYear(),
      this.currentEndDate.value.getMonth(),
      this.currentEndDate.value.getDate() - 1,
    ).toISOString(),
  };
  monthlyFilter: FilterOrdersCockpit = {
    pageable: {
      pageSize: 10000,
      pageNumber: 0,
      sort: [
        {
          property: 'bookingdate',
          direction: 'ASC',
        },
      ],
    },
    type: 'monthly',
    startBookingdate: new Date(
      this.currentStartDate.value.getFullYear(),
      this.currentStartDate.value.getMonth() - 12,
      1,
    ).toISOString(),
    endBookingdate: new Date().toISOString(),
  };

  predictionBusy = false;
  dailyBusy = false;
  monthlyBusy = false;

  editPredictionDayIndex = 0;

  constructor(private predictionService: PredictionService) {}

  ngOnInit(): void {
    this.fetchOrders(this.predictionFilter);
    this.fetchOrders(this.dailyFilter);
    this.fetchOrders(this.monthlyFilter);
  }

  colorGenerator(size: number): { r: number; g: number; b: number }[] {
    const hs = Array(size)
      .fill(0)
      .map((_, i) => i / size);
    const s = 0.5;
    const v = 0.9;
    const p = v * (1 - s);

    return hs.map((h) => {
      let r: number;
      let g: number;
      let b: number;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          (r = v), (g = t), (b = p);
          break;
        case 1:
          (r = q), (g = v), (b = p);
          break;
        case 2:
          (r = p), (g = v), (b = t);
          break;
        case 3:
          (r = p), (g = q), (b = v);
          break;
        case 4:
          (r = t), (g = p), (b = v);
          break;
        case 5:
          (r = v), (g = p), (b = q);
          break;
      }

      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
      };
    });
  }

  updateGraphClick(evt: any): void {
    return this.fetchOrders(
      evt.currentTarget.dataset.type === 'daily'
        ? this.dailyFilter
        : this.monthlyFilter,
    );
  }

  fetchOrders(filter: FilterOrdersCockpit | PredictionCriteria): void {
    const data = [];
    let labels = [];

    if (filter.type === 'prediction') {
      this.predictionBusy = true;
    } else if (filter.type === 'daily') {
      this.dailyBusy = true;
    } else if (filter.type === 'monthly') {
      this.monthlyBusy = true;
    }

    const json = JSON.stringify(filter);
    const observable =
      filter.type === 'prediction'
        ? this.predictionService.getPrediction(filter as PredictionCriteria)
        : this.predictionService.getOrders(filter as FilterOrdersCockpit);

    observable.subscribe((orders) => {
      if (json !== JSON.stringify(filter)) {
        return;
      }

      orders.dishes.forEach((record) => {
        data.push({
          type: 'line',
          fill: false,
          data: record.orders,
          label: record.name,
          cubicInterpolationMode: 'monotone',
        });
      });

      // we need color generator for number of dishes we have,
      const colors = this.colorGenerator(orders.dishes.length);
      data.forEach((record, index) => {
        const color = colors[index];
        record.backgroundColor =
          'rgba(' + color.r + ',' + color.g + ',' + color.b + ',0.2)';
        record.borderColor =
          'rgba(' + color.r + ',' + color.g + ',' + color.b + ',1)';
        record.pointBackgroundColor =
          'rgba(' + color.r + ',' + color.g + ',' + color.b + ',1)';
        record.pointBorderColor = '#fff';
        record.pointHoverBackgroundColor = '#fff';
        record.pointHoverBorderColor =
          'rgba(' + color.r + ',' + color.g + ',' + color.b + ',0.8)';
      });

      switch (filter.type) {
        case 'monthly':
          labels = orders.dates.map((date, index) => {
            return [date.toLocaleDateString('en-GB', { month: 'short' })];
          });
          break;
        case 'daily':
        case 'prediction':
          labels = orders.dates.map((date, index) => {
            return [
              date.toLocaleDateString('en-GB', { weekday: 'short' }) +
                ' ' +
                date.toLocaleDateString('en-GB'),
              orders.weather[index] + '°C',
            ];
          });
          break;
      }

      if (filter.type === 'daily' || filter.type === 'prediction') {
        // get the max value of all orders to set it as value of holiday bar
        const max =
          Math.ceil(
            Math.max(...data.map((record) => Math.max(...record.data))) / 10,
          ) * 10;
        const weekHolidays = orders.holidays.map((record, index) => {
          return record ? max : 0;
        });
        data.push({
          type: 'bar',
          fill: true,
          data: weekHolidays,
          label: 'holiday',
          designation: orders.holidays,
          backgroundColor: 'rgba(0,100,0,0.1)',
        });
      }

      let chartCanvas: Chart;
      let ctx: CanvasRenderingContext2D;

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
        const config = (chartCanvas = {
          type: 'bar',
          data: {
            labels,
            datasets: data,
          },
          options: {
            responsive: true,
            hover: {
              animationDuration: 0,
            },
            legend: {
              display: true,
              labels: {
                filter: (dataLabel, chart) => {
                  if (dataLabel.text !== 'holiday') {
                    return dataLabel;
                  }
                },
              },
            },
            tooltips: {
              callbacks: {
                label: (tooltipItem, dataTooltip) => {
                  const ordersTooltip =
                    dataTooltip.datasets[tooltipItem.datasetIndex].data[
                      tooltipItem.index
                    ];
                  const ordersLabel =
                    Math.round(ordersTooltip * 10) / 10 +
                    ' order' +
                    (ordersTooltip !== 1 ? 's' : '');

                  switch (filter.type) {
                    case 'monthly':
                      return ordersLabel;
                    case 'daily':
                    case 'prediction':
                      if (
                        dataTooltip.datasets[tooltipItem.datasetIndex]
                          .designation
                      ) {
                        return dataTooltip.datasets[tooltipItem.datasetIndex]
                          .designation[tooltipItem.index];
                      }

                      return ordersLabel;
                  }
                },
              },
            },
          },
        });
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

  triggerPrediction(): void {
    clearTimeout(this.triggerPredictionId);

    this.triggerPredictionId = setTimeout(() => {
      this.fetchOrders(this.predictionFilter);
    }, 500);
  }

  getEditPredictionDayLabel(): string {
    const date = new Date(
      this.currentStartDate.value.getFullYear(),
      this.currentStartDate.value.getMonth(),
      this.currentStartDate.value.getDate() + this.editPredictionDayIndex,
    );

    return (
      date.toLocaleDateString('en-GB', { weekday: 'short' }) +
      ' ' +
      date.toLocaleDateString('en-GB')
    );
  }

  monthlyCalendarYearHandler(calendarDate: Moment, filterType: string): void {
    if (filterType === 'start') {
      const dateValue = this.currentStartDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setDate(1);
      this.currentStartDate.setValue(dateValue);
      this.monthlyFilter.startBookingdate = new Date(
        this.currentStartDate.value.getFullYear(),
        this.currentStartDate.value.getMonth(),
        1,
      ).toISOString();
    } else if (filterType === 'end') {
      const dateValue = this.currentEndDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setDate(1);
      this.currentEndDate.setValue(dateValue);
      this.monthlyFilter.endBookingdate = new Date(
        this.currentEndDate.value.getFullYear(),
        this.currentEndDate.value.getMonth(),
        1,
      ).toISOString();
    }
  }

  monthlyCalendarMonthHandler(
    calendarDate: Moment,
    filterType: string,
    datepicker: OwlDateTimeComponent<Moment>,
  ): void {
    if (filterType === 'start') {
      const dateValue = this.currentStartDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setMonth(calendarDate.month());
      dateValue.setDate(1);
      this.currentStartDate.setValue(dateValue);
      this.monthlyFilter.startBookingdate = new Date(
        this.currentStartDate.value.getFullYear(),
        this.currentStartDate.value.getMonth(),
        1,
      ).toISOString();
    } else if (filterType === 'end') {
      const dateValue = this.currentEndDate.value;
      dateValue.setFullYear(calendarDate.year());
      dateValue.setMonth(calendarDate.month());
      dateValue.setDate(1);
      this.currentEndDate.setValue(dateValue);
      this.monthlyFilter.endBookingdate = new Date(
        this.currentEndDate.value.getFullYear(),
        this.currentEndDate.value.getMonth(),
        1,
      ).toISOString();
    }
    datepicker.close();
  }
}

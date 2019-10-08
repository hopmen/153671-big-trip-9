import Statistics from "../components/statistics.js";
import {Position, render} from "../utils.js";
import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class StatisticsController {
  constructor(container) {
    this._container = container;
    this._statistics = new Statistics();
    this._cards = [];
    this._moneyChart = {};
    this._transportChart = {};
    this._timeChart = {};
  }

  create(cards) {
    this._cards = cards;

    render(this._container, this._statistics.getElement(), Position.BEFOREEND);
  }

  updateData(cards) {
    this._cards = cards;

    this._chartMoneyInit();
    this._chartTransportInit();
    this._chartTimeInit();
  }

  show() {
    this._chartMoneyInit();
    this._chartTransportInit();
    this._chartTimeInit();
    this._statistics.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._statistics.getElement().classList.add(`visually-hidden`);
  }

  _chartMoneyInit() {
    const moneyCtx = this._statistics.getElement().querySelector(`.statistics__chart--money`);

    const cards = this._cards.reduce((acc, currentValue) => {
      const index = acc.findIndex(({type}) => type === currentValue.type.title);
      if (index !== -1) {
        acc[index].price += currentValue.price;
      } else {
        acc.push({
          type: currentValue.type.title,
          price: currentValue.price,
        });
      }
      return acc;
    }, []);

    const types = cards.map(({type}) => type);
    const prices = cards.map(({price}) => price);

    this._moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: types,
        datasets: [{
          data: prices,
          backgroundColor: `#fff`,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `left`,
            font: {
              size: 16
            },
            color: `#000`,
            formatter: (value) => `${value}€`
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              padding: 0,
            },
            display: false,
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontSize: 16
            }
          }]
        },
        tooltips: {
          enabled: false
        },
        title: {
          position: `left`,
          display: true,
          text: `MONEY`,
          fontSize: 20,
          fontColor: `#000000`
        },
        legend: {
          display: false
        }
      }
    });
  }

  _chartTransportInit() {
    const transportCtx = this._statistics.getElement().querySelector(`.statistics__chart--transport`);

    const transportCards = this._cards.filter(({type}) => type.type === `transport`);
    const cards = transportCards.reduce((acc, currentValue) => {
      const index = acc.findIndex(({type}) => type === currentValue.type.title);
      if (index !== -1) {
        acc[index].count++;
      } else {
        acc.push({
          type: currentValue.type.title,
          count: 1,
        });
      }
      return acc;
    }, []);

    const types = cards.map(({type}) => type);
    const counts = cards.map(({count}) => count);

    this._transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: types,
        datasets: [{
          data: counts,
          backgroundColor: `#fff`,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `left`,
            font: {
              size: 16
            },
            color: `#000`,
            formatter: (value) => `${value}x`
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              padding: 0,
            },
            display: false,
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontSize: 16
            }
          }]
        },
        tooltips: {
          enabled: false
        },
        title: {
          position: `left`,
          display: true,
          text: `TRANSPORT`,
          fontSize: 20,
          fontColor: `#000000`
        },
        legend: {
          display: false
        }
      }
    });
  }

  _chartTimeInit() {
    const timeCtx = this._statistics.getElement().querySelector(`.statistics__chart--time`);

    const cards = this._cards.map((card) => {
      const startMoment = moment(card.startTime);
      const endMoment = moment(card.endTime);
      const diff = endMoment.diff(startMoment);
      const title = `${card.type.title}  ${card.type.placeholder}  ${card.city.name}`;
      const duration = Math.abs(moment.duration(diff).asHours());

      return {
        title,
        duration,
      };
    });

    const labels = cards.map(({title}) => title);
    const durations = cards.map(({duration}) => duration);

    this._timeChart = new Chart(timeCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data: durations,
          backgroundColor: `#fff`,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `left`,
            font: {
              size: 16
            },
            color: `#000`,
            formatter: (value) => `${Math.round(value)}H`
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              padding: 0,
            },
            display: false,
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontSize: 16
            }
          }]
        },
        tooltips: {
          enabled: false
        },
        title: {
          position: `left`,
          display: true,
          text: `TIME-SPEND`,
          fontSize: 20,
          fontColor: `#000000`
        },
        legend: {
          display: false
        }
      }
    });
  }
}

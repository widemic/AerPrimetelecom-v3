import {Component} from "@angular/core";

@Component({
    selector: 'app-panou',
    templateUrl: './panou.component.html',
    styleUrls: ['./panou.component.scss']
  })

export class barChartOptions{

public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    title: {
      display: true,
      text: 'Concentratie CO2 in ultimele 24h',
      fontColor: 'black',  // chart title color (can be hexadecimal too)
    },
    scales: {
      xAxes: [{
        stacked: false,
        ticks: {
          fontColor: 'black',  // x axe labels (can be hexadecimal too)
        },
        gridLines: {
          color: 'rgba(245, 245, 245, 0.2)',  // grid line color (can be removed or changed)
        }
      }],
      yAxes: [{
        stacked: false,
        ticks: {
          fontColor: 'black',  // y axes numbers color (can be hexadecimal too)
          min: 0,
          beginAtZero: true,
        },
        gridLines: {
          color: 'rgba(245, 245, 245, 0.2)',  // grid line color (can be removed or changed)
        },
        scaleLabel: {
          display: false,
          labelString: 'scale label',
          fontColor: 'black',  // y axe label color (can be hexadecimal too)
        }
      }]
    },
    legend: {
      display: false,
      labels: {
        fontColor: 'black',  // legend color (can be hexadecimal too)
      },
    }
  };

}
import { Component, OnInit, AfterViewInit, Input, OnChanges, Directive } from '@angular/core';
import { SensorDataModel } from '../sensor-data.model';
import { SensorDataService } from '../sensor-data.service';
import { Observable } from 'rxjs';
import { ChartsModule } from 'ng2-charts';



@Component({
  selector: 'app-panou',
  templateUrl: './panou.component.html',
  styleUrls: ['./panou.component.scss']
})
export class PanouComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() NodeID: string = '';



  public ComponentBoolean: boolean;
  public ComponentStatus: string;
  public barHeight = 120;
  public NodeIdParrent: string;
  public showLabels = false;
  public showTicks = true;
  public reverse = false;
  public startAngle = 0;
  public endAngle = 180;
  public rangeSize = 10;
  public rangeLineCap = 'round';
  public rangePlaceholderColor = '#6e5e5';
  public ticksColor = '#000';
  public labelsColor = '#000';

  public greens: Array<number> = [];
  public reds: Array<number> = [];

  public ValueCO2 = 12;

  public sensorsdata: SensorDataModel[];
  chartsensordata: SensorDataModel[];
  public locationdata: SensorDataModel[];
  public CO2_array: any[] = [];
  public CO_array: any[] = [];
  public TEMP_array: any[] = [];
  public HUM_array: any[] = [];
  public PRESS_array: any[] = [];
  public O3_array: any[] = [];
  public NO_array: any[] = [];
  public NO2_array: any[] = [];
  public SO2_array: any[] = [];
  public time_array: any[] = [];
  public DateChart: any[] = [];
  public location_array: any[] = [];
  public CO_index: number = 0.874;
  public PRESS_mmhg: number;
  public isDataAvailable: boolean = false;
  public CO2_color = [];
  public CO_color = [];
  public NO2_color = [];
  public SO2_color = [];
  public TEMP_color = [];
  public PRESS_color = [];
  public HUM_color = [];
  public totalIndex: string;
  public totalIndexColor: string;


  constructor(private sensordataservice: SensorDataService) {
    var i: number;
    for (i = 0; i < 255; i = i + 6) {
      this.greens.push(i);
    }
    for (i = 255; i >= 0; i = i - 5) {
      this.reds.push(i)
    }
    var sum = 0;
    console.log(this.NodeID)
  }
  ngOnChanges() {
    console.log(this.NodeID);
    this.NodeIdParrent = this.NodeID;


    this.CO2_array = [];
    this.CO_array = [];
    this.TEMP_array = [];
    this.HUM_array = [];
    this.PRESS_array = [];
    this.O3_array = [];
    this.NO_array = [];
    this.NO2_array = [];
    this.SO2_array = [];
    this.time_array = [];


    this.sensordataservice.getNodeLastSensorData(this.NodeIdParrent).subscribe((data: SensorDataModel[]) => {
      this.sensorsdata = data;
      this.sensorsdata.map(item => {
        this.PRESS_mmhg = parseInt((item.press * 0.00750061683).toFixed(0));
      })
    })
    this.sensordataservice.getNodeLastLimitSensorData(this.NodeIdParrent, 24).subscribe((data: SensorDataModel[]) => {
      this.chartsensordata = data;
      this.chartsensordata.map(item => {
        this.CO2_array.push(item.CO2);
        this.CO_array.push(item.CO);
        this.TEMP_array.push(item.temp);
        this.HUM_array.push(item.hum);
        this.PRESS_array.push(parseInt((item.press * 0.00750061683).toFixed(0)));
        this.O3_array.push(item.O3);
        this.NO_array.push(item.NO);
        this.NO2_array.push(item.NO2);
        this.SO2_array.push(item.SO2);
        this.time_array.push(item.messageTime);
      })
      this.CO_array.reverse();
      this.CO2_array.reverse();
      this.NO2_array.reverse();
      this.NO_array.reverse();
      this.SO2_array.reverse();
      this.TEMP_array.reverse();
      this.HUM_array.reverse();
      this.PRESS_array.reverse();
      this.O3_array.reverse();
    })

    this.isDataAvailable = true;
    if (this.NodeID === undefined) {
      this.totalIndex = "Nici un Dispozitiv";
      this.totalIndexColor = 'gray';
    }
    else {
    this.totalIndex = "50";
    this.totalIndexColor = 'green';
    }
    //console.log(this.barChartLabels);
    console.log(this.totalIndex);
    setTimeout(() => { this.refresh() }, 500)
    //this.refresh();
  }
  ngOnInit() {
    // console.log(this.NodeID)
    // this.NodeIdParrent = this.NodeID;

    // this.sensordataservice.getNodeLastSensorData(this.NodeIdParrent).subscribe((data: SensorDataModel[]) => {
    //   this.sensorsdata = data;
    //   this.sensorsdata.map(item => {
    //     this.PRESS_mmhg = parseInt((item.press * 0.00750061683).toFixed(0));
    //   })
    // })
    // this.sensordataservice.getNodeLastLimitSensorData(this.NodeIdParrent, 24).subscribe((data: SensorDataModel[]) => {
    //   this.chartsensordata = data;
    //   this.chartsensordata.map(item => {
    //     this.CO2_array.push(item.CO2);
    //     this.CO_array.push(item.CO);
    //     this.TEMP_array.push(item.temp);
    //     this.HUM_array.push(item.hum);
    //     this.PRESS_array.push(parseInt((item.press * 0.00750061683).toFixed(0)));
    //     this.O3_array.push(item.O3);
    //     this.NO_array.push(item.NO);
    //     this.NO2_array.push(item.NO2);
    //     this.SO2_array.push(item.SO2);
    //     this.time_array.push(item.messageTime);
    //   })
    //   this.CO_array.reverse();
    //   this.CO2_array.reverse();
    //   this.NO2_array.reverse();
    //   this.NO_array.reverse();
    //   this.SO2_array.reverse();
    //   this.TEMP_array.reverse();
    //   this.HUM_array.reverse();
    //   this.PRESS_array.reverse();
    //   this.O3_array.reverse();
    // })
    // this.isDataAvailable = true;
    // console.log(this.CO2_array);
  }
  ngAfterViewInit() {
    //setTimeout(() => { this.refresh() }, 500)
  }
  public refresh(): void {
    if (this.NodeID != null) {
      console.log(this.NodeID)
      this.CO_array.forEach(element => {
        if (element <= 4.4) this.CO_color.push('rgb(107, 201, 38)');
        if (element > 4.4 && element <= 9.4) this.CO_color.push('rgb(209, 207, 30)');
        if (element > 9. && element <= 12.4) this.CO_color.push('rgb(239, 187, 15)');
        if (element > 12.4) this.CO_color.push('rgb(119, 0, 120)');
      });
      this.CO2_array.forEach(element => {
        if (element <= 350) this.CO2_color.push('rgb(107, 201, 38)');
        if (element > 350 && element <= 700) this.CO2_color.push('rgb(209, 207, 30)');
        if (element > 700 && element <= 1000) this.CO2_color.push('rgb(239, 187, 15)');
      });
      this.NO2_array.forEach(element => {
        if (element <= 0.053) this.NO2_color.push('rgb(107, 201, 38)');
        if (element > 0.053 && element <= 0.1) this.NO2_color.push('rgb(209, 207, 30)');
        if (element > 0.1 && element <= 0.36) this.NO2_color.push('rgb(239, 187, 15)');
        if (element > 0.36) this.NO2_color.push('rgb(119, 0, 120)');
      });
      this.SO2_array.forEach(element => {
        if (element <= 0.035) this.SO2_color.push('rgb(107, 201, 38)');
        if (element > 0.035 && element <= 0.075) this.SO2_color.push('rgb(209, 207, 30)');
        if (element > 0.075 && element <= 0.185) this.SO2_color.push('rgb(239, 187, 15)');
        if (element > 0.185) this.SO2_color.push('rgb(119, 0, 120)');
      });

      this.TEMP_array.forEach(element => {
        if (element <= 0) this.TEMP_color.push('rgb(5, 20, 200)');
        if (element > 0 && element <= 10) this.TEMP_color.push('rgb(7, 101, 38)');
        if (element > 10 && element <= 25) this.TEMP_color.push('rgb(107, 201, 38)');
        if (element > 25 && element <= 30) this.TEMP_color.push('rgb(209, 207, 30)');
        if (element > 30) this.TEMP_color.push('rgb(239, 187, 15)');
      });
      this.PRESS_array.forEach(element => {
        if (element <= 750) this.PRESS_color.push('rgb(209, 207, 30)');
        if (element > 750 && element <= 780) this.PRESS_color.push('rgb(107, 201, 38)');
        if (element > 780) this.PRESS_color.push('rgb(119, 0, 120)');
      });
      this.HUM_array.forEach(element => {
        if (element <= 70) this.HUM_color.push('rgb(107, 201, 38)');
        if (element > 70 && element <= 75) this.HUM_color.push('rgb(209, 207, 30)');
        if (element > 75) this.HUM_color.push('rgb(239, 187, 15)');

      });


      let data = this.CO2_array;
      let clone = JSON.parse(JSON.stringify(this.CO2ChartData));
      clone[0].data = data;
      this.CO2ChartData = clone;
      console.log(clone);
      console.log(this.CO2ChartData);

      data = this.CO_array;
      clone = JSON.parse(JSON.stringify(this.COChartData));
      clone[0].data = data;
      this.COChartData = clone;

      data = this.NO2_array;
      clone = JSON.parse(JSON.stringify(this.NO2ChartData));
      clone[0].data = data;
      this.NO2ChartData = clone;

      data = this.NO_array;
      clone = JSON.parse(JSON.stringify(this.NOChartData));
      clone[0].data = data;
      this.NOChartData = clone;

      data = this.SO2_array;
      clone = JSON.parse(JSON.stringify(this.SO2ChartData));
      clone[0].data = data;
      this.SO2ChartData = clone;

      data = this.O3_array;
      clone = JSON.parse(JSON.stringify(this.O3ChartData));
      clone[0].data = data;
      this.O3ChartData = clone;

      data = this.TEMP_array;
      clone = JSON.parse(JSON.stringify(this.TempChartData));
      clone[0].data = data;
      this.TempChartData = clone;

      data = this.HUM_array;
      clone = JSON.parse(JSON.stringify(this.HumChartData));
      clone[0].data = data;
      this.HumChartData = clone;

      data = this.PRESS_array;
      clone = JSON.parse(JSON.stringify(this.PressChartData));
      clone[0].data = data;
      this.PressChartData = clone;

      this.barChartLabels.length = 0;
      this.time_array.forEach(element => {
        var newDate = new Date(element).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.barChartLabels.push(newDate);
      });
      this.barChartLabels.reverse();


      //this.barChartLabels = this.DateChart;
      console.log(this.DateChart);

    }
  }
  //   drawChart(){
  // this.barChartData =[{ data: this.CO2_array, label: 'CO2' },];
  // let clone = JSON.parse(JSON.stringify(this.barChartData));
  //     this.barChartData=clone;
  // }
  n: number = Date.now();
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public CO2ChartData = [{ data: [] = [], label: 'CO2' }];
  //public CO2ChartData : Observable<any[]>;
  public COChartData = [{ data: [], label: 'CO' }];
  public NO2ChartData = [{ data: [], label: 'NO2' }];
  public NOChartData = [{ data: [], label: 'NO' }];
  public SO2ChartData = [{ data: [], label: 'SO2' }];
  public O3ChartData = [{ data: [], label: 'O3' }];
  public TempChartData = [{ data: [], label: 'Temp' }];
  public HumChartData = [{ data: [], label: 'Hum' }];
  public PressChartData = [{ data: [], label: 'Pres' }];


  // let clone = JSON.parse(JSON.stringify(this.barChartData));
  // this.barChartData=clone;


  public CO2_chartColors: Array<any> = [
    { // first color
      backgroundColor: this.CO2_color,
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];

  public CO_chartColors: Array<any> = [
    { // first color
      backgroundColor: this.CO_color,
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];

  public NO2_chartColors: Array<any> = [
    { // first color
      backgroundColor: this.NO2_color,
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];

  public SO2_chartColors: Array<any> = [
    { // first color
      backgroundColor: this.SO2_color,
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];

  public NO_chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgb(107, 201, 38)',
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];

  public TEMP_chartColors: Array<any> = [
    { // first color
      backgroundColor: this.TEMP_color,
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];

  public PRESS_chartColors: Array<any> = [
    { // first color
      backgroundColor: this.PRESS_color,
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];

  public HUM_chartColors: Array<any> = [
    { // first color
      backgroundColor: this.HUM_color,
      borderColor: '#fff',
      borderWidth: '1',
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: '#000',
      fontColor: '#000'
    }];



  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,

    scales: {
      xAxes: [{
        stacked: false,

      }],

    },
    legend: {
      display: false,
      labels: {
        fontColor: 'black',  // legend color (can be hexadecimal too)
      },
    }
  };
}



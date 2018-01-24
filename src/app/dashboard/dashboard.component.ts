import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


// Doughnut
  public doughnutChartLabels:string[] = ['Rasperry Pi Model A', 'Rasberry Pi Model B'];
  public doughnutChartData:number[] = [37, 63];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
    console.log('TEst!');
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


}

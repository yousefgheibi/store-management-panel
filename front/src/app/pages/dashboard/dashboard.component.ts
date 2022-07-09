import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  ngOnInit() {

    const labels = ['اسفند', 'بهمن','دی','آذر','آبان','مهر','شهریور','مرداد','تیر','خرداد','اردیبهشت','فروردین'];
    const ctx = (document.getElementById('liner-chart') as HTMLCanvasElement)?.getContext('2d');
    const liner = new Chart(ctx, {
      type: 'line',
      data : this.data = {
        labels: labels,
        datasets: [
          {
            label: 'هزینه',
            data: [65, 59, 80, 81, 56, 85, 40,24,72,61,55,84],
            fill: false,
            borderColor: '#11CDEF',
            tension: 0.1
          },
          {
            label: 'درآمد',
            data: [65, 59, 80, 81, 56, 55, 40,24,22,61,52,34],
            fill: false,
            borderColor: '#FFD600',
            tension: 0.1
          },
          {
          label: 'خرید',
          data: [15, 21, 30, 81, 56, 55, 40,24,22,53,25,34],
          fill: false,
          borderColor: '#FB6340',
          tension: 0.1
        },
        {
          label: 'فروش',
          data: [6, 13, 20, 13, 26, 51, 40,24,22,21,55,44],
          fill: false,
          borderColor: '#F5365C',
          tension: 0.1
        }
      
      ]
      },
      options: {
        responsive: true,
        rtl: true,
        plugins: {
          legend: {
            position: 'right',
            labels :{
              family: 'irsans'
            }
          }
          
        },
        scales: {
          xAxes: [{
              ticks: {
                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 90
              },
        position: 'right',
          }]
      },
      // reverse:true
      },
    });
  }
}

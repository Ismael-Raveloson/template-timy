import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var ApexCharts: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Small delay to ensure global scripts from angular.json are loaded and executed
    setTimeout(() => {
      this.initCharts();
    }, 500);
  }

  private initCharts() {
    if (typeof ApexCharts === 'undefined') {
      console.warn('ApexCharts is not defined yet. Retrying in 1s...');
      setTimeout(() => this.initCharts(), 1000);
      return;
    }
    // Area Chart
    const areaChartElt = document.querySelector("#areaChart");
    if (areaChartElt) {
      const areaChart = new ApexCharts(areaChartElt, {
        series: [{
          name: "Website",
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: "Mobile",
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
        chart: {
          height: 350,
          type: 'area',
          background: 'transparent',
          toolbar: { show: false }
        },
        colors: ['#3ad29f', '#3f80ea'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' }
      });
      areaChart.render();
    }

    // Radial Bar Widget
    const radialElt = document.querySelector("#radialbarWidget");
    if (radialElt) {
      const radialChart = new ApexCharts(radialElt, {
        series: [67],
        chart: {
          height: 150,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: { size: '70%' }
          }
        },
        labels: ['Progress'],
      });
      radialChart.render();
    }

    // Radial Bar
    const radialBarElt = document.querySelector("#radialbar");
    if (radialBarElt) {
      const radialBar = new ApexCharts(radialBarElt, {
        series: [70],
        chart: {
          height: 150,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
             hollow: { size: '60%' }
          }
        },
        labels: ['CPU Usage']
      });
      radialBar.render();
    }

    // Bar Chart Widget
    const barWidgetElt = document.querySelector("#barChartWidget");
    if (barWidgetElt) {
      const barWidget = new ApexCharts(barWidgetElt, {
        series: [{
          name: 'Revenue',
          data: [44, 55, 41, 64, 22, 43, 36]
        }],
        chart: {
          type: 'bar',
          height: 150,
          toolbar: { show: false }
        },
        plotOptions: {
          bar: { horizontal: false, columnWidth: '55%' }
        },
        dataLabels: { enabled: false },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        }
      });
      barWidget.render();
    }
  }
  recentActivity = [
    {
      user: '@Brown Asher',
      action: 'Just create new layout Index, form, table',
      project: 'Tiny Admin',
      category: 'Creative Design',
      time: '1h ago',
      statusClass: 'item-primary'
    },
    {
      user: '@Hester Nissim',
      action: 'has upload new files to',
      project: 'Tiny Admin',
      category: 'Front-End Development',
      time: '1h ago',
      statusClass: 'item-warning',
      images: ['assets/products/p1.jpg', 'assets/products/p2.jpg', 'assets/products/p3.jpg', 'assets/products/p4.jpg']
    },
    {
      user: '@Kelley Sonya',
      action: 'has commented on',
      project: 'Advanced table',
      category: 'Back-End Development',
      time: '1h ago',
      statusClass: 'item-success',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim nulla eu quam cursus placerat.'
    }
  ];

  recentData = [
    { id: 2474, name: 'Brown, Asher D.', address: 'Ap #331-7123 Lobortis Avenue', date: '13/09/2020' },
    { id: 2786, name: 'Leblanc, Yoshio V.', address: '287-8300 Nisl. St.', date: '04/05/2019' },
    { id: 2747, name: 'Hester, Nissim L.', address: '4577 Cras St.', date: '04/06/2019' },
    { id: 2639, name: 'Gardner, Leigh S.', address: 'P.O. Box 228, 7512 Lectus Ave', date: '04/08/2019' },
    { id: 2238, name: 'Higgins, Uriah L.', address: 'Ap #377-5357 Sed Road', date: '04/01/2019' }
  ];
}

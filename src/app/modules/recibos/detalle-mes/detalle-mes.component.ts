import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { GraficoGeneral } from '../interfaces/datosGraficos';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};
@Component({
  selector: 'app-detalle-mes',
  templateUrl: './detalle-mes.component.html',
  styleUrls: ['./detalle-mes.component.scss']
})
export class DetalleMesComponent implements OnInit, OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      series: [this.datos.data[1].cantidad,this.datos.data[0].cantidad,this.datos.data[2].cantidad],
      chart: {
        type: "pie"
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 1
      },
      labels: [
        "Ambos",
        "Empleador",
        "No Firmados",
        
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }
  @Input() datos: GraficoGeneral
  @Input() cantidadRecibos: number
  @Output() close = new EventEmitter<string>();
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.chartOptions = {
      series: [this.datos.data[1].cantidad,this.datos.data[0].cantidad,this.datos.data[2].cantidad],
      chart: {
        type: "pie"
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 1
      },
      labels: [
        "Ambos",
        "Empleador",
        "No Firmados",
        
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }



}

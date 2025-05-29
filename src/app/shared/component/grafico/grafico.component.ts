import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Estadistica } from './estadistica';

interface DatosGrafico {
  labels: string[];
  datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[] }[];
}

@Component({
  selector: 'app-grafico',
  imports: [ChartModule],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent implements OnInit {
  datosGrafico: DatosGrafico;
  data: any;
  options: any;
  estadisticas = input<Estadistica[]>();
  
  labels: string[] = [];
  datos: number [] = [];
  colors : string[] =['red','green','blue','yellow','lime','orange','emerald','teal','cyan','sky','amber','indigo','violet','purple','fuchsia',
    'pink','rose','slate','gray','zinc','neutral','stone'];


  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  themeEffect = effect(() => {
    this.initChart();   
  });

  ngOnInit() {
      this.initChart();
  }

  initChart() {
    let labels: string[] = [];
    let datos: number[] = [];
    this.estadisticas().forEach((estadistica: Estadistica) => {
        labels.push(estadistica.titulo);
        datos.push(estadistica.valor);
    });
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--p-text-color');
          let backgroundColor: any[] = [];   
          let hoverBackgroundColor: any[] = [];
            labels.forEach((label, index) => {
                backgroundColor.push(documentStyle.getPropertyValue(`--p-${this.colors[index]}-500`));
                hoverBackgroundColor.push(documentStyle.getPropertyValue(`--p-${this.colors[index]}-400`));
            });

          this.data = {
              labels: labels,
              datasets: [
                  {
                      data: datos,
                      backgroundColor: backgroundColor,
                      hoverBackgroundColor: hoverBackgroundColor,
                  }
              ]
          };
          this.options = {
              cutout: '60%',
              plugins: {
                  legend: {
                      labels: {
                          color: textColor
                      }
                  }
              }
          };
          this.cd.markForCheck()
      }
  }
}

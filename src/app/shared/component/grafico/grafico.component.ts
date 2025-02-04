import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-grafico',
  imports: [ChartModule],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent implements OnInit {
  
  data: any;
  options: any;
  
  labels: string[] = [];
  datos: number [] = [];
  colors : string[] =['red','orange','amber','yellow','lime','green','emerald','teal','cyan','sky','blue','indigo','violet','purple','fuchsia',
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
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--p-text-color');

          this.data = {
              labels: ['A', 'B', 'C'],
              datasets: [
                  {
                      data: [300, 50, 100],
                      backgroundColor: [documentStyle.getPropertyValue('--p-sky-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                      hoverBackgroundColor: [documentStyle.getPropertyValue('--p-sky-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
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

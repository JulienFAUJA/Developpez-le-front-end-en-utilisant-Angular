import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges,OnDestroy   {
  public chart: any;
  public font_size: number = 22;
  @Input() countryData: { country: string; medals: number }[] = [];

  constructor() {}

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie',

      data: {
        labels: this.countryData.map((data) => data.country),
       
        datasets: [
          {
            data: this.countryData.map(
              (data) => data.medals
            ) /*[250, 400, 200, 405, 220, 180],*/,
            backgroundColor: [
              'rgb(120, 20, 60)',
              'rgb(170, 170, 250)',
              'rgb(160, 100, 255)',
              'rgb(180, 180, 255)',
              'rgb(160, 160, 255)',
              
            ],
            hoverOffset: 1,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 3.0,
        plugins: {
          legend: {
            display: false,
                labels: {
                  
                    color: 'rgb(255, 99, 132)'
                }
          },
          tooltip: {
            enabled: true, // Active les tooltips
            backgroundColor: 'rgb(4, 131, 143)', // Fond des tooltips
            bodyColor: '#fff', // Couleur du texte des tooltips
            displayColors:false,
            titleFont:{
              size: this.font_size, // Taille de la police pour les tooltips
            },
            titleColor:"white",
            titleAlign:"center",
            bodyAlign:"center",
            bodyFont: {
              size: this.font_size, // Taille de la police pour les tooltips
            },
            bodySpacing: 4, // Espacement à l'intérieur du tooltip
            mode: 'point', // Montre les tooltips au point le plus proche
            position: 'nearest', // Positionne les tooltips près du point le plus proche
            cornerRadius: 3, // Rayon des coins du tooltip
            xAlign:"center", 
            yAlign:"bottom",
            caretSize: 15, // Taille du triangle sous le tooltip
            // Vous pouvez ajuster d'autres styles ici pour correspondre à vos besoins
          },
          annotation: {
            annotations: {
              label1: {
                type: 'label',
                xValue: 100,
                xAdjust: 150,
                yValue: 0,
                yAdjust: -170,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: ['______ '+this.countryData.map((data) => data.country)[0]],
                font: {
                  size: this.font_size,
                },
              },
              label2: {
                type: 'label',
                xValue: 100,
                xAdjust: 250,
                yValue: 10,
                yAdjust: -100,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: ['__________ '+this.countryData.map((data) => data.country)[1]],
                font: {
                  size: this.font_size,
                },
              },

              label3: {
                type: 'label',
                xValue: 100,
                xAdjust: 220,
                yValue: 10,
                yAdjust: 150,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: ['____________'+this.countryData.map((data) => data.country)[2]],
                font: {
                  size: this.font_size,
                },
              },

              label4: {
                type: 'label',
                xValue: 100,
                xAdjust: -250,
                yValue: 10,
                yAdjust: -150,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [this.countryData.map((data) => data.country)[4]+'____________'],
                font: {
                  size: this.font_size,
                },
              },
              label5: {
                type: 'label',
                xValue: 100,
                xAdjust: -300,
                yValue: 10,
                yAdjust: -10,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [this.countryData.map((data) => data.country)[3]+'____________'],
                font: {
                  size: this.font_size,
                },
              },

              
            },
          },
        },
      },
    });
  }

  ngOnInit(): void {
    console.log(
      'mes data parsées:',
      this.countryData.map((data) => data.country),
      this.countryData.map((data) => data.medals)
    );
    this.createChart();
  }

  ngOnDestroy(): void {
    // Détruit le graphique pour libérer le canvas lorsque le composant est détruit
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      'mes data parsées:',
      this.countryData.map((data) => data.country),
      this.countryData.map((data) => data.medals)
    );
    if (changes['countryData']) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.createChart(); // Recréez le graphique avec les nouvelles données
    }
  }
}
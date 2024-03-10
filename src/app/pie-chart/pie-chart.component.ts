import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartLabelPlugin, PLUGIN_ID } from 'chart.js-plugin-labels-dv';

Chart.register(annotationPlugin);
Chart.register(ChartDataLabels);
Chart.register(getChartLabelPlugin());

//

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges, OnDestroy {
  public chart: any;
  public font_size: number = 22;
  public colors: string[] = [
    'rgb(120, 20, 60)',
    'rgb(170, 170, 250)',
    'rgb(160, 100, 255)',
    'rgb(180, 180, 255)',
    'rgb(160, 160, 255)',
  ];
  @Input() countryData: { country: string; medals: number }[] = [];

  constructor() {}

  private hasRegisteredPlugin(): boolean {
    return !!Chart.registry?.plugins.get(PLUGIN_ID);
  }

  createChart() {

    if (!this.hasRegisteredPlugin()) {
      Chart.register(getChartLabelPlugin());
    }

    this.chart = new Chart('MyChart', {
      
      type: 'pie',

      data: {
        labels: this.countryData.map((data) => data.country),

        datasets: [
          {
            data: this.countryData.map((data) => data.medals),
            backgroundColor: this.colors,
            hoverOffset: 1,
          
          },
        ],
      },
      plugins: [ChartDataLabels],

      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              return '' + context.chart.data.labels?.at(context.dataIndex);
            },
            listeners: {
              click: function (context, event) {
                // Receives `click` events only for labels of the first dataset.
                // The clicked label index is available in `context.dataIndex`.
                console.log(
                  'label ' + context.dataIndex + ' has been clicked!'
                );
                console.log(
                  'mouse is at position x:',
                  event.x,
                  'and y:',
                  event.y
                );
              },
            },
            
            
            offset: function (context) {
              const data_index = context.dataIndex;
              if (data_index <2) {
                return -10;
              }
              else if (data_index == 2) {
                return 130;
              
              } else {
                return 30;
              }
            },
            align: function (context) {
              const data_index = context.dataIndex;
              if (data_index <2) {
                return 'right';
              }
              else if (data_index == 2) {
                return -45;
              
              } else {
                return 'left';
              }
            },

            anchor: 'end',
            textAlign: 'end',
            font: {
              weight: 'bold',
              size: 22,
            },
            padding: function (context) {
              const data_index = context.dataIndex;
              if (data_index==0) {
                return {
                  left:220,
                  top:10,
                  right:15,
                  bottom:-40
                };
              }
              else if (data_index==1) {
                return  {
                  left:110,
                  top:20,
                  right:100,
                  bottom:-10
                };
              
              } else if (data_index == 2) {
                return  {
                  left:120,
                  top:0,
                  right:160,
                  bottom:0
                };
              
              } 
              else if (data_index == 3) {
                return  {
                  left:200,
                  top:0,
                  right:90,
                  bottom:0
                };
              
              } 
              else if (data_index == 4) {
                return  {
                  left:240,
                  top:100,
                  right:50,
                  bottom:0
                };
              
              } else {
                return  {
                  left:200,
                  top:20,
                  right:100,
                  bottom:-10
                };
              }
            },
            
          },

          legend: {
            display: false,
            labels: {
              color: 'rgb(0, 0, 0)',
            },
          },
          tooltip: {
            enabled: true, // Active les tooltips
            backgroundColor: 'rgb(4, 131, 143)', // Fond des tooltips
            bodyColor: '#fff', // Couleur du texte des tooltips
            displayColors: false,
            titleFont: {
              size: this.font_size, // Taille de la police pour les tooltips
            },
            titleColor: 'white',
            titleAlign: 'center',
            bodyAlign: 'center',
            bodyFont: {
              size: this.font_size, // Taille de la police pour les tooltips
            },
            bodySpacing: 4, // Espacement à l'intérieur du tooltip
            mode: 'point', // Montre les tooltips au point le plus proche
            position: 'nearest', // Positionne les tooltips près du point le plus proche
            cornerRadius: 3, // Rayon des coins du tooltip
            xAlign: 'center',
            yAlign: 'bottom',
            caretSize: 15, // Taille du triangle sous le tooltip
            // Vous pouvez ajuster d'autres styles ici pour correspondre à vos besoins
          },
          annotation: {
            annotations: {
              label1: {
                type: 'label',
                xValue: 0,
                xAdjust: 200,
                yValue: 200,
                yAdjust: -200,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [],
                font: {
                  size: this.font_size,
                },
                
                callout: {
                  display: true,
                  borderColor:this.colors[0],
                  side: 110,
                  borderWidth:6,
                  
                  
                 
                },
              },
              label2: {
                type: 'label',
                xValue: 100,
                xAdjust: 290,
                yValue: 10,
                yAdjust: -110,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [],
                font: {
                  size: this.font_size,
                },
                
                callout: {
                  display: true,
                  borderColor:this.colors[1],
                  side: 120,
                  borderWidth:6,
                  borderJoinStyle:'round',
                  
                 
                },
              },
              label3: {
                type: 'label',
                xValue: 20,
                xAdjust: 320,
                yValue: 10,
                yAdjust: 100,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [],
                font: {
                  size: this.font_size,
                },
                callout: {
                  display: true,
                  borderColor:this.colors[2],
                  side: 120,
                  borderWidth:6,
                },
              },

              label4: {
                type: 'label',
                xValue: 100,
                xAdjust: -280,
                yValue: 10,
                yAdjust: -195,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [],
                font: {
                  size: this.font_size,
                },
                callout: {
                  display: true,
                  borderColor:this.colors[4],
                  side: 180,
                  borderWidth:6,
                },
              },
              label5: {
                type: 'label',
                xValue: 100,
                xAdjust: -400,
                yValue: 0,
                yAdjust: -15,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [],
                font: {
                  size: this.font_size,
                },
                callout: {
                  display: true,
                  borderColor:this.colors[3],
                  side: 10,
                  borderWidth:6,
                },
              },
            },
          },
        },
      },
    });
  }

  /*

  label1: {
                type: 'label',
                xValue: 100,
                xAdjust: 200,
                yValue: 0,
                yAdjust: -170,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [this.countryData.map((data) => data.country)[0]],
                font: {
                  size: this.font_size,
                },
                
                callout: {
                  display: true,
                  borderColor:this.colors[0],
                  side: 120,
                  borderWidth:5,
                  borderJoinStyle:'round',
                  
                 
                },
              },
              label2: {
                type: 'label',
                xValue: 100,
                xAdjust: 290,
                yValue: 10,
                yAdjust: -90,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [this.countryData.map((data) => data.country)[1]],
                font: {
                  size: this.font_size,
                },
                callout: {
                  display: true,
                  borderColor:this.colors[1],
                  side: 120,
                  borderWidth:5,
                },
              },

              label3: {
                type: 'label',
                xValue: 200,
                xAdjust: 300,
                yValue: 10,
                yAdjust: 150,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [this.countryData.map((data) => data.country)[2]],
                font: {
                  size: this.font_size,
                },
                callout: {
                  display: true,
                  borderColor:this.colors[2],
                  side: 120,
                  borderWidth:5,
                },
              },

              label4: {
                type: 'label',
                xValue: 100,
                xAdjust: -250,
                yValue: 10,
                yAdjust: -150,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [this.countryData.map((data) => data.country)[4]],
                font: {
                  size: this.font_size,
                },
                callout: {
                  display: true,
                  borderColor:this.colors[4],
                  side: 100,
                  borderWidth:5,
                },
              },
              label5: {
                type: 'label',
                xValue: 100,
                xAdjust: -300,
                yValue: 10,
                yAdjust: -10,
                backgroundColor: 'rgba(255,255,255, 0)',
                content: [this.countryData.map((data) => data.country)[3]],
                font: {
                  size: this.font_size,
                },
                callout: {
                  display: true,
                  borderColor:this.colors[3],
                  side: 50,
                  borderWidth:5,
                },
              },

  */

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

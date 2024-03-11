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
import { Router } from '@angular/router';

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
    'rgb(149, 96, 101)',
    'rgb(184, 203, 231)',

    'rgb(137, 161, 219)',

    'rgb(121, 61, 82)',
    'rgb(151, 128, 161)',
  ];
  @Input() countryData: { country: string; medals: number }[] = [];

  constructor(private router: Router) {}

  goOn(countryName: string) {
    return this.router; //.navigateByUrl('detail');
  }

  createChart() {
    const self = this;
    this.chart = new Chart('MyChart', {
      type: 'pie',

      data: {
        labels: this.countryData.map((data) => data.country),

        datasets: [
          {
            data: this.countryData.map((data) => data.medals),
            backgroundColor: this.colors,
            borderColor: this.colors,
            hoverOffset: 0,
          },
        ],
      },
      plugins: [ChartDataLabels],

      options: {
        layout:{
          padding:25,
          
        },
        responsive: true,
       
        maintainAspectRatio:false,
        

        plugins: {
          datalabels: {
            formatter: function (value, context) {
              console.log(context.chart.data.labels?.at(context.dataIndex));
              return '' + context.chart.data.labels?.at(context.dataIndex);
            },
            listeners: {
              click: function (context, event) {
                // Receives `click` events only for labels of the first dataset.
                // The clicked label index is available in `context.dataIndex`.
                const country_name = context.chart.data.labels?.at(
                  context.dataIndex
                );
                console.log('label ' + country_name + ' has been clicked!');
                console.log(
                  'mouse is at position x:',
                  event.x,
                  'and y:',
                  event.y
                );
                self.router.navigateByUrl('/detail/' + context.dataIndex);
              },
              enter: function (context, event) {
                // Receives `enter` events for any labels of any dataset. Indices of the
                // clicked label are: `context.datasetIndex` and `context.dataIndex`.
                // For example, we can modify keep track of the hovered state and
                // return `true` to update the label and re-render the chart.
                context.active = true;

                return context.active;
              },
            },
            borderWidth:1,
            borderColor:'red',
            padding:{
              left:30,
              right:20,
            },
          offset:-10,
           align:"end",
            anchor: 'end',
            textAlign: 'start',
            font: {
              weight: 'bold',
              size: 22,
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
                  borderColor: this.colors[0],
                  side: 110,
                  borderWidth: 6,
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
                  borderColor: this.colors[1],
                  side: 120,
                  borderWidth: 6,
                  borderJoinStyle: 'round',
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
                  borderColor: this.colors[2],
                  side: 120,
                  borderWidth: 6,
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
                  borderColor: this.colors[4],
                  side: 180,
                  borderWidth: 6,
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
                  borderColor: this.colors[3],
                  side: 10,
                  borderWidth: 6,
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

import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Chart, { ArcElement } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getChartLabelPlugin, PLUGIN_ID } from 'chart.js-plugin-labels-dv';
import { Router } from '@angular/router';
import { observeOn } from 'rxjs';
import { text } from 'body-parser';

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
   
    'rgb(151, 128, 161)',
    'rgb(121, 61, 82)',
    'rgb(149, 96, 101)',
    'rgb(184, 203, 231)',
    'rgb(137, 161, 219)',
  ];
  @Input() countryData: { country: string; medals: number }[] = [];

  constructor(private router: Router) {}

  goOn(countryName: string) {
    return this.router; //.navigateByUrl('detail');
  }

  createChart() {
    interface Point {
      x: number;
      y: number;
    }

    function calculateAngle(
      horizontalLine: number,
      verticalLine: number,
      pointX: number,
      pointY: number
    ): number {
      // Calculer les différences entre les coordonnées du point et de l'origine
      const dx = pointX - horizontalLine;
      const dy = pointY - verticalLine;

      // Calculer l'angle en radians en utilisant la fonction arctangente
      let angle = Math.atan2(dy, dx);

      // Convertir l'angle en degrés
      angle = angle * (180 / Math.PI);

      // Ajuster l'angle pour qu'il soit dans la plage de 0 à 360 degrés
      if (angle < 0) {
        angle = 360 + angle;
      }

      return angle;
    }

    function GetEndPoint(
      chart: Chart,
      startPointX: number,
      startPointY: number,
      angleInDegrees: number
    ): Point {
      const left = chart.chartArea.left;
      const centerX = chart.chartArea.width / 2;
      const centerY = chart.chartArea.height / 2;
    
      // Déterminer le quadrant de l'angle
      let quadrant: number;
      if (startPointX >= centerX) {
        if (startPointY >= centerY) {
          quadrant = 1;
        } else {
          quadrant = 4;
        }
      } else {
        if (startPointY >= centerY) {
          quadrant = 2;
        } else {
          quadrant = 3;
        }
      }
      const startLenght:number = 160;
      // Ajuster les longueurs en fonction du quadrant
      let lengthX = quadrant === 1 || quadrant === 4 ? startLenght : -startLenght;
      let lengthY = quadrant === 3 || quadrant === 2 ? startLenght : startLenght;
    
      // Convertir l'angle en radians
      const angleInRadians = (angleInDegrees * Math.PI) / 180;
    
      let endX = startPointX + lengthX * Math.cos(-angleInRadians);
      let endY = startPointY+ lengthY * Math.sin(angleInRadians);
    
      while (chart.ctx.isPointInStroke(endX, endY)) {
        // Calculer les coordonnées de fin de la ligne en fonction de l'angle et de la longueur
        endX = startPointX + lengthX * Math.cos(angleInRadians);
        endY = startPointY + lengthY * Math.sin(angleInRadians);
    
        // Ajuster les longueurs en fonction du quadrant de l'angle
        if (quadrant === 1 || quadrant === 4) {
          lengthX += 10;
        } else {
          lengthX -= 10;
        }
        if (quadrant === 3 || quadrant === 2) {
          lengthY += 10;
        } else {
          lengthY -= 10;
        }
      }
    
      // Retourner les coordonnées de début et de fin de la ligne
      return {
        x: endX,
        y: endY,
      };
    }
    

    // Tri du tableau par ordre alphabétique du pays
this.countryData.sort((a, b) => {
  // Compare les pays en les convertissant en minuscules pour ignorer la casse
  return a.country.toLowerCase().localeCompare(b.country.toLowerCase());
});
    

    const self = this;

    const pie_labels_plugin = {
      id: 'pieLabelsLinePlugin',
      afterDraw(chart: Chart, args: {}, options: {}) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;
        //console.log(chart.data.datasets);
        chart.data.datasets.forEach((dataset, i) => {
          console.log(chart.getDatasetMeta(i));
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            console.log('tooltipPosition:', datapoint.tooltipPosition(true));
            const { x, y } = datapoint.tooltipPosition(true);
            const rectBox = {
              left: left,
              top: top,
              right: right,
              bottom: bottom,
            };
            const angle = calculateAngle(height / 2, width / 2, x, y);
            console.log('angle:', angle);
            const color = dataset.backgroundColor as string[];
            ctx.fillStyle = color[index];

            const halfWidth = width / 2;
            const halfHeight = height / 2;
            const label_pos = chart.ctx.isPointInPath(x + 10, y + 20);
            const endPoint: Point = GetEndPoint(chart, x, y, angle);
            console.log('label:',chart.data.labels?.at(index), endPoint,"x:",x);
            ctx.beginPath();
            ctx.moveTo(endPoint.x, endPoint.y+20);
            const offset:number = x<halfWidth ? -1 : 1;
            //ctx.lineTo(x, endPoint.y+20);
            const left_offset = index>2 ? -120 : 0;
            ctx.fillRect(x+left_offset, endPoint.y+20, Math.abs(endPoint.x-x),3);


            ctx.strokeStyle = color[index];
            //ctx.strokeRect(endPoint.x, endPoint.y, 20, 5)
            ctx.stroke();
            const texte = chart.data.labels?.at(index) as string;
            const textWidth = ctx.measureText(texte);
            ctx.font="20px Arial";
            ctx.fillStyle='black';
            const text_x = index>2 ? x+left_offset-(textWidth.width)+10 : endPoint.x;
            ctx.fillText(texte,text_x, endPoint.y+30);
           

            //ctx.fillStyle = color[index];
            //ctx.fillRect(x,y, 5, 5);

            /*ctx.fillRect(x,y, 5, 5);
            const x2:number = datapoint_angles?.x || 1;
            const y2:number = datapoint_angles?.y || 1;
            */
          });
        });
      },
    };
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
      plugins: [ChartDataLabels, pie_labels_plugin],

      options: {
        layout: {
          padding: 80, //25,
        },
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          datalabels: {
            formatter: function (value, context) {
              console.log(context.chart.data.labels?.at(context.dataIndex));
              return '';// + context.chart.data.labels?.at(context.dataIndex);
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
            
            padding: {
              left: 10,
              right: 10,
            },
            offset: 20,
            align: function(context){
              const idx = context.dataIndex;
              if(idx>3){
                return "left";
              }
              return "right";
            },
            anchor: 'end',
            textAlign: 'end',
            clamp:true,
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
            mode: 'nearest', 
            position: 'average', // Positionne les tooltips près du point le plus proche
            cornerRadius: 3, // Rayon des coins du tooltip
            xAlign: 'left',
            yAlign: 'top',
            caretSize: 15, // Taille du triangle sous le tooltip
            // Vous pouvez ajuster d'autres styles ici pour correspondre à vos besoins
          },
          annotation: {
            annotations: {
             
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

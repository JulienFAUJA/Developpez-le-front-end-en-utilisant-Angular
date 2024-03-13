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
import { Router } from '@angular/router';
import { observeOn } from 'rxjs';
import { text } from 'body-parser';
import { Point } from '../core/models/Point';
import { Size, Size1 } from '../core/models/Size';

Chart.register(annotationPlugin);
Chart.register(ChartDataLabels);

//

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges, OnDestroy {
  public chart:any;
  public font_size: number = 22;
  public colors: string[] = [
   
    'rgb(151, 128, 161)',
    'rgb(121, 61, 82)',
    'rgb(149, 96, 101)',
    'rgb(184, 203, 231)',
    'rgb(137, 161, 219)',
  ];
  @Input() countryData: {id:number, country: string; medals: number }[] = [];

  constructor(private router: Router) {}

  goOn(countryName: string) {
    return this.router;
  }

  /**
   * Fonction de création du Pie
   */
  createChart() {


    /**
     * Cette fonction sert à récupérer l'angle de la position du tooltip pour obtenir la
     * bonne position à l'extrémité du pie pour tracer la ligne.
     * @param horizontalLine centre vertical (donc point pour diamètre horizontal)
     * @param verticalLine centre horizontal (donc point pour diamètre vertical)
     * @param pointX x
     * @param pointY y
     * @returns l'angle du tooltip
     */
    function calculateAngle(horizontalLine: number, verticalLine: number, pointX: number, pointY: number): number {
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

    /**
     * 
     * @param chart Fonction qui obtient le point de l'extrémité d'un segment
     * @param startPointX x du tooltip
     * @param startPointY y du tooltip
     * @param angleInDegrees l'angle du tooltip
     * @returns le point de l'extrémité du segment
     */
    function GetEndPoint(chart: Chart, startPointX: number, startPointY: number, angleInDegrees: number): Point {
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
    /**
     * Cette fonction me sert à calculer des offsets de manière responsive : 
     * Elle prend un offset en pixels et en calcule le ratio par rapport à la taille de 
     * l'écran au moment de la validation du rendu par le dev (moi). 
     * Plus tard, ce ratio sera multiplié par la width ou height de l'écran 
     * courant pour avoir des offsets en pixels toujours responsives.
     * Ex: si j'ai validé que pour la taille d'écran sur laquelle je teste, 
     * un offset x doit être à 30px je calcule le ratio de 30px / mon screen width. 
     * (si l'offset était y, j'aurai divisé par screen height), puis ensuite, 
     * je multiplie ce ratio par la taille (width ou height) de l'utilisateur 
     * pour que l'offset soit compatible sur toutes les tailles d'écran.
     * Bien conscient que ce n'est pas sa place d'être ici mais je la laisse pour que
     * l'évaluateur comprenne ou je veux en venir avec tous ces nombres à virgule plus bas.
     * @param val la valeur à calculer
     * @param text Juste un texte pour indiquer dans le console log (toujours mieux que coucou)
     * @param direction pour définir si c'est un ratio horizontal / vertical ou r pour l'aspect ratio.
     */
    function get_ratio(val:number, text:string, direction:string){
      let div:number=1;
      if(direction==="h"){
        div=596;
      }
      else if(direction==="w"){
        div=963;
      }
      else if(direction==="r"){
        div=1.6157718120805369;
      }
      console.log(text, val/div);
    }
    // Le this n'est plus pris dans le contexte donc le self me permet d'utiliser le routing depuis le pie
    const self = this;
    const canvas = document.querySelector('canvas');
    // L'orientation de l'écran
    const orientation:ScreenOrientation = window.screen.orientation;
    // Ceci va permettre d'afficher les légendes ou pas, en fonction de l'orientation
    let label_enabled:boolean=false;


    if(orientation.type==="portrait-primary"){
      canvas?.setAttribute("width",(window.screen.availWidth).toString());
      canvas?.setAttribute("height",(window.screen.availHeight*0.8).toString());
      label_enabled = true;
    }
    else if(orientation.type==="landscape-primary"){
      canvas?.setAttribute("width",(window.screen.availWidth/2).toString());
      canvas?.setAttribute("height",(window.screen.availHeight*0.8).toString());
      label_enabled = false;
    }
    canvas?.setAttribute('padding',"0");
    
    
    const screen:Size1=window.screen;
    const screen_size:Size = {width:screen.width, height:screen.height,aspect_ratio:screen.width/screen.height};

    const padding_offset:number=49.51194184839045*screen_size.aspect_ratio;


    const pie_labels_plugin = {
      id: 'pieLabelsLinePlugin',
      afterDraw(chart: Chart, args: {}, options: {}) {
        const { ctx, chartArea: { top, bottom, left, right, width, height },  } = chart;
        
   

        if(label_enabled===false){
          chart.data.datasets.forEach((dataset, i) => {
            
            chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
              const { x, y } = datapoint.tooltipPosition(true);
              const rectBox = {
                left: left,
                top: top,
                right: right,
                bottom: bottom,
  
              };
              const halfWidth = width / 2;
              const halfHeight = height / 2;

              const angle = calculateAngle(halfHeight, halfWidth, x, y);
              const color = dataset.backgroundColor as string[];
              ctx.fillStyle = color[index];
  
              
              
  
  
              const endPoint: Point = GetEndPoint(chart, x, y, angle);
              console.log('label:',chart.data.labels?.at(index), endPoint,"x:",x);
              ctx.beginPath();
              ctx.moveTo(endPoint.x, endPoint.y);
              const index_for_offset:number=2;
              const left_offset = index>index_for_offset ? index<4? -0.18*screen_size.width: -0.19*screen_size.width : 0;
              const top_offset = index>1 ? 0.2*screen_size.height : 0.128389261744966443*screen_size.height;
            
              const thickness:number=0.0050335570469798654*screen_size.height;
              ctx.fillRect(x+left_offset, endPoint.y+top_offset, Math.abs(endPoint.x-x),thickness);
  
              ctx.strokeStyle = color[index];
              ctx.stroke();
              const texte = chart.data.labels?.at(index) as string;
              const textWidth = ctx.measureText(texte);
              ctx.font="18px Arial";
              ctx.fillStyle='black';
              const text_x = index>index_for_offset ? x+left_offset-(textWidth.width)+10 : endPoint.x;
              const text_y:number =  endPoint.y+top_offset+(0.0120*screen_size.height);
              ctx.fillText(texte,text_x, text_y);
             
  
            
            });
          });
        }
        
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
          padding: padding_offset, 
        },
        responsive: true,
        maintainAspectRatio: label_enabled,
        aspectRatio:label_enabled?screen_size.aspect_ratio:1,

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
                const page_id:number=self.countryData[context.dataIndex].id-1;
                console.log("country:", self.countryData[context.dataIndex].country, "id:",page_id,"index:",context.dataIndex)
                self.router.navigateByUrl('/detail/' +page_id );
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
            display: label_enabled,
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

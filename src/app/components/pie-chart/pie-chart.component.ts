import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { TextPosition } from 'src/app/core/models/TextPosition';
import { Point } from 'src/app/core/models/Point';
import { Size, Size1 } from 'src/app/core/models/Size';
import { RectBox } from 'src/app/core/models/RectBox';

Chart.register(ChartDataLabels);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges, OnDestroy {
  public chart: any;
  public font_size: number = 22;
  public max_id:number=0;
  public colors: string[] = [
    'rgb(151, 128, 161)',
    'rgb(121, 61, 82)',
    'rgb(149, 96, 101)',
    'rgb(184, 203, 231)',
    'rgb(137, 161, 219)',
  ];
  @Input() countryData: { id: number; country: string; medals: number }[] = [];
  

  constructor(private router: Router) {}

  /**
   * Fonction de création du Pie
   */
  createChart() {
    /**
     * Positionne chaque texte à sa place par rapport à la position de son tooltip
     * mais prend en compte les éléments suivants pour gérer le responsive:
     * sa position (du tooltip) par rapport aux moitié width et height.
     * @param index L'index de l'élément dans le dataset
     * @param tooltipPoint Le tooltip de l'élément
     * @param halfWidth La moitié de la largeur
     * @param halfHeight La moitié de la hauteur
     * @param rectBox La box du contenu
     * @returns La position du texte actuel
     */
    function set_text_position(
      index: number,
      tooltipPoint: Point,
      halfWidth: number,
      halfHeight: number,
      rectBox: RectBox
    ): Point {
      const left_half: boolean = tooltipPoint.x < halfWidth ? true : false;
      const upper_half: boolean = tooltipPoint.y < halfHeight ? true : false;
      let text_x: number;
      let text_y: number;
      const offset_value: number = 15;
      let offset_x: number = index % 2 == 0 ? -offset_value : offset_value;

      if (left_half === true) {
        if (index === 0 || index === 1) text_x = halfWidth + offset_x;
        else text_x = halfWidth / 3 + offset_x;
      } else {
        if (index <= 2) {
          text_x =
            rectBox.right - Math.abs(rectBox.right - halfWidth) / 3 + offset_x;
        } else {
          text_x = halfWidth / 4 + offset_x;
        }
      }
      if (upper_half === true) {
        if (index === 0) {
          text_y = rectBox.top + 10;
        } else if (index === 1) {
          text_y = tooltipPoint.y - 10;
        } else {
          text_y = tooltipPoint.y - 30;
        }
      } else {
        switch (index) {
          case 0:
            text_y = tooltipPoint.y - 15;
            break;
          case 1:
            text_y = tooltipPoint.y - 10;
            break;
          case 2:
            text_y =
              rectBox.bottom -
              Math.abs(rectBox.bottom - tooltipPoint.y) / 2 +
              5;
            break;
          case 3:
            text_y = tooltipPoint.y;
            break;
          default:
            text_y = tooltipPoint.y - 15;
            break;
        }
      }
      return {
        x: text_x,
        y: text_y,
      } as Point;
    }

    // Le this n'est plus pris dans le contexte donc le self me permet d'utiliser le routing depuis le pie
    const self = this;
    const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
    // L'orientation de l'écran
    const orientation: ScreenOrientation = window.screen.orientation;
    // Ceci va permettre d'afficher les légendes ou pas, en fonction de l'orientation
    let label_enabled: boolean = false;
    // J'ai détecté un problème sur le device laptop dans l'inspecteur. Il me considère que portrait et landscape sont inversés
    // J'y remédie alors dans le IF suivant
    const height_ratio: number = 0.8;
    const new_height: number = window.screen.availHeight * height_ratio;
    const width_label:string = "width";
    const height_label:string = "height";
    const laptop: Size1 = { width: 1366, height: 768 };
    if (
      orientation.type === 'portrait-primary' &&
      window.screen.availHeight !== laptop.height &&
      window.screen.availWidth !== laptop.width
    ) {
      canvas?.setAttribute(width_label, window.screen.availWidth.toString());
      canvas?.setAttribute(height_label, new_height.toString());
      label_enabled = true;
    } else if (orientation.type === 'landscape-primary') {
      canvas?.setAttribute(width_label, (window.screen.availWidth / 2).toString());
      canvas?.setAttribute(height_label, new_height.toString());
      label_enabled = false;
    }
    canvas?.setAttribute('padding', '0');

    const screen: Size1 = window.screen;
    const screen_size: Size = {
      width: screen.width,
      height: screen.height,
      aspect_ratio: screen.width / screen.height,
    };

    const padding_offset: number = 49.51194184839045 * screen_size.aspect_ratio;
    self.max_id=self.countryData.length;

    /* Mon propre plugin pour ChartJS, dans le but de positionner le texte et
     gérer le clic */
    const pie_labels_plugin = {
      id: 'pieLabelsLinePlugin',
      afterDraw(chart: Chart, args: {}, options: {}) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;

        // Ensemble pour stocker les positions des textes
        const textPositions = new Set<TextPosition>();

        if (label_enabled === false) {
          chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
              const { x, y } = datapoint.tooltipPosition(true);
              const tooltipPoint: Point = {
                x: x,
                y: y,
              };
              const rectBox: RectBox = {
                left: left,
                top: top,
                right: right,
                bottom: bottom,
              };
              const halfWidth: number = width / 2;
              const halfHeight: number = height / 2;
              const texte = chart.data.labels?.at(index) as string;
              const textPos: Point = set_text_position(
                index,
                tooltipPoint,
                halfWidth,
                halfHeight,
                rectBox
              );

              const color = dataset.backgroundColor as string[];
              ctx.fillStyle = color[index];

              ctx.beginPath();
              const textWidth: TextMetrics = ctx.measureText(texte);

              ctx.font = '18px Arial';
              ctx.fillStyle = 'black';
              const line_offset_x: number =
                textPos.x > halfWidth ? 0 : textWidth.width;
              const y_offset: number = 5;
              ctx.moveTo(textPos.x + line_offset_x, textPos.y - y_offset);
              const offset_val: number = 5;
              const x_offset: number = index < 3 ? offset_val : -offset_val;

              ctx.lineTo(x + x_offset, textPos.y - y_offset);
              ctx.strokeStyle = color[index];
              ctx.stroke();

              ctx.fillText(texte, textPos.x, textPos.y);

              // Ajouter la position du texte à l'ensemble
              const position: TextPosition = {
                x: textPos.x,
                y: textPos.y - 25,
                width: textWidth.width,
                height: 50,
                name: texte,
                id: index,
              };

              textPositions.add(position);

              // Gestion de l'événement onclick
              ctx.canvas.addEventListener('click', (event) => {
                const rect: DOMRect = ctx.canvas.getBoundingClientRect();
                const clickX: number = event.clientX - rect.left;
                const clickY: number = event.clientY - rect.top;

                // Vérifier si le clic est dans l'un des textes
                for (const position of textPositions) {
                  if (
                    clickX > position.x &&
                    clickX < position.x + position.width &&
                    clickY >= position.y - position.height &&
                    clickY <= position.y + position.height
                  ) {
                    const page_id: number = self.countryData[position.id].id;
                    if (page_id>self.max_id){
                      self.router.navigateByUrl('not-found/');
                    }
                    else{
                      self.router.navigateByUrl('/detail/' + page_id);
                    }
                    break;
                  }
                }                    
                    event.stopImmediatePropagation();
                    chart.clear();
                return;
              });
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
        aspectRatio: label_enabled ? screen_size.aspect_ratio : 1,
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              return '';
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
          },
        },
      },
    });
  }

  ngOnInit(): void {
    this.forceDestroy();
    this.createChart();
  }
  forceDestroy(){
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
  ngOnDestroy(): void {
    // Détruit le graphique pour libérer le canvas lorsque le composant est détruit
    this.forceDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['countryData']) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.createChart(); // Recréez le graphique avec les nouvelles données
    }
  }
}

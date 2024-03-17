import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart, { ChartType } from 'chart.js/auto';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from '../../core/models/Participation';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  public chart:any;
  public font_size: number = 18;
  participations!: Participation[];
  len!:number | undefined;
  @Input() country!: Olympic;


  /**
   * Fonction qui crée et gère le graphique
   */
  createChart() {
    
    try {
      this.participations = this.country.participations;
      this.chart.destroy();
    } catch (error) {
    }

    if (this.chart) {
      this.chart.destroy(); // Détruit le graphique existant s'il y en a un
    }

    this.chart = new Chart('MyChartLine', {
      type: 'line',

      data: {
        labels: this.participations.map((value) => value.year), 

        datasets: [
          {
            label: 'Medals Count', // Ajoutez un label pour votre dataset
            data: this.participations.map((value) => value.medalsCount),
            backgroundColor: 'rgb(25,28,58)', // Couleur de fond
            borderColor: 'blue', // Couleur de la bordure
            borderWidth: 4, // Largeur de la bordure
            fill: false, // Ne pas remplir l'aire sous la ligne
            pointBorderWidth:4,
            pointRadius:10,
            pointBorderColor:'rgb(25,28,58)',
            
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 3.0,
        scales: {
          x: {
            ticks: {
              color: 'black',
              font: {
                size: this.font_size,
              },
            },
          },
          y: {
            ticks: {
              color: 'black',
              font: {
                size: this.font_size,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgb(0, 0, 0)',
            },
          },
        },
      },
    });
  }

  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    this.createChart();
  }
  

  forceDestroy() {
    // Détruit le graphique pour libérer le canvas lorsque le composant est détruit
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
      canvas?.remove();
    }
  }
  ngOnDestroy(): void {
    this.forceDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const countryId:number = +this.route.snapshot.params['id'];
    if ((changes['country'] || changes['participations'])) {
      this.forceDestroy();
      this.createChart(); // Recréez le graphique avec les nouvelles données
    }
  }
}

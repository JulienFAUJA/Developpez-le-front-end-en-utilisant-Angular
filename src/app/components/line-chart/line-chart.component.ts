import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from '../../core/models/Participation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  public chart: any;
  public font_size: number = 22;
  participations!: Participation[];
  @Input() country!: Olympic;

  createChart() {
    try {
      console.log('country (lineChartComponent):', this.country);
      this.participations = this.country.participations;
    } catch (error) {
      console.log('erreur : ', error);
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
            backgroundColor: 'rgba(255, 99, 132, 1.0)', // Couleur de fond
            borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la bordure
            borderWidth: 4, // Largeur de la bordure
            fill: false, // Ne pas remplir l'aire sous la ligne
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 3.0,
        scales: {
          x: {
            ticks: {
              color:"black",
              font:{
                size:18,
              }
            },
          },
          y: {
            ticks: {
              color:"black",
              font:{
                size:18,
              }
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

  constructor(   
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
    if (changes['country'] || changes['participations']) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.createChart(); // Recréez le graphique avec les nouvelles données
    }
  }
}

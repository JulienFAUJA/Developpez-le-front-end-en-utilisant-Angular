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
import annotationPlugin from 'chartjs-plugin-annotation';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
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
  public olympics$: Observable<any> = of(null);
  @Input() country!: Olympic;

  createChart() {
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
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur de fond
            borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la bordure
            borderWidth: 1, // Largeur de la bordure
            fill: false, // Ne pas remplir l'aire sous la ligne
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 3.0,
        scales: {
          y: {
            ticks: {},
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
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    try {
      console.log('country (lineChartComponent):', this.country);
      this.participations = this.country.participations;
    } catch (error) {
      console.log('erreur : ', error);
      const countryId = +this.route.snapshot.params['id'];
    }

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
    if (changes['country']) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.createChart(); // Recréez le graphique avec les nouvelles données
    }
  }
}

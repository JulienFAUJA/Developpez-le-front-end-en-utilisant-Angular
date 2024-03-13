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

Chart.register(annotationPlugin);

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnChanges, OnDestroy {
  public chart: any;
  public font_size: number = 22;
  countryName!: string;
  country!: Olympic;
  totalNumberOfMedals!: number;
  numberOfParticipations!: number;
  totalNumberOfAthletes!: number;
  participations!: Participation[];
  public olympics$!: Observable<Olympic[]>;

  createChart() {
    this.chart = new Chart('MyChartLine', {
      type: 'line',

      data: {
        xLabels: [this.participations.map((value) => value.year)],
        yLabels: [this.participations.map((value) => value.medalsCount)],

        datasets: [
          {
            data: [this.participations.map((value) => value.medalsCount)],
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
              color: 'rgb(255, 99, 132)',
            },
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
                content: ['______ '],
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
                content: ['__________ '],
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

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  get_data(countryId: number) {
    this.olympicService.getOlympics().subscribe((data: Olympic[]) => {
      console.log('countryId:', countryId);
      this.country = data[countryId];
      console.log('this.country:', this.country);
      this.countryName = this.country.country;
      this.participations = this.country.participations;
      this.numberOfParticipations = new Set(
        this.participations.map((participation) => participation.year)
      ).size;

      // Création d'un attribut pour chaque pays avec la somme totale de ses médailles
      this.totalNumberOfMedals = this.participations.reduce(
        (sum, participation) => sum + participation.medalsCount,
        0
      );
      this.totalNumberOfAthletes = this.participations.reduce(
        (sum, participation) => sum + participation.athleteCount,
        0
      );

      console.log(`Nom du pays: ${this.countryName}`);
      console.log(
        `Nombre de participations aux JO: ${this.numberOfParticipations}`
      );
      console.log(`Total des médailles du pays:`, this.totalNumberOfMedals);
      console.log(`Total des athlètes du pays:`, this.totalNumberOfAthletes);
    });
    this.createChart();
  }
  ngOnInit() {
    const countryId = +this.route.snapshot.params['id'];
    this.get_data(countryId);
  }

  ngOnDestroy(): void {
    // Détruit le graphique pour libérer le canvas lorsque le composant est détruit
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('mes data parsées:');
    if (changes['participations']) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.createChart(); // Recréez le graphique avec les nouvelles données
    }
  }
}

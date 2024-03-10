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
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

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
  totalNumberOfMedals!: number;
  totalNumberOfAthletes!: number;
  public olympics$: Observable<any> = of(null);

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',

      data: {
        xLabels: [this.countryName],

        datasets: [
          {
            data: [250, 400, 200, 405, 220, 180],
            backgroundColor: [
              'rgb(120, 20, 60)',
              'rgb(170, 170, 250)',
              'rgb(160, 100, 255)',
              'rgb(180, 180, 255)',
              'rgb(160, 160, 255)',
            ],
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

  constructor(private olympicService: OlympicService) {}

  get_data() {
    /*
    this.olympicService.getOlympics().subscribe((data: Olympic[]) => {
     
     
      this.listOfCountries = data.map((country) => country.country); // Liste des pays
    
      // Pour le nombre total de JO, on doit compter toutes les participations uniques
      this.totalJO = new Set(
        data.flatMap((country) => country.participations.map((participation) => participation.year))
      ).size;
    
      // Création d'un attribut pour chaque pays avec la somme totale de ses médailles
      this.totalMedalsByCountry = data.map((country) => ({
        country: country.country,
        medals: country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
      }));
    
      console.log(`Nombre de pays: ${this.numberOfCountries}`);
      console.log(`Liste des pays: ${this.listOfCountries}`);
      console.log(`Nombre total de JO: ${this.totalJO}`);
      console.log(`Total des médailles par pays:`, this.totalMedalsByCountry);
    });
    */
  }
  ngOnInit() {
    this.get_data();
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
    if (changes['countryData']) {
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.createChart(); // Recréez le graphique avec les nouvelles données
    }
  }
}

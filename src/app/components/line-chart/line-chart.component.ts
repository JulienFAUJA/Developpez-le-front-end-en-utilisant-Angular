import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart, { ChartType } from 'chart.js/auto';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  public chart:any;
  public font_size: number = 18;
  participations!: Participation[];
  public years:number[] = [];
  @Input() len!:number | undefined;
  @Input() country!: Olympic;


  
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

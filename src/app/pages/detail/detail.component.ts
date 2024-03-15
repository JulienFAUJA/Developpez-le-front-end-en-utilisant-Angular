import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class DetailComponent implements OnInit {
  countryName!: string;
  country!: Olympic;
  totalNumberOfMedals!: number;
  numberOfParticipations!: number;
  totalNumberOfAthletes!: number;
  participations!: Participation[];
  public olympics$!: Observable<Olympic[]>;



  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get_data(countryId: number) {
    this.olympicService.getOlympics().subscribe((data: Olympic[]) => {
      if(typeof countryId !== 'number'){
        this.router.navigateByUrl('/**/' + countryId);
      }
      if(countryId>data.length){
        countryId=0;
      }
     
      this.country = data[countryId];
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



    });
  }
  ngOnInit() {
    const countryId = +this.route.snapshot.params['id'];
    this.get_data(countryId);
  }

 

 
}

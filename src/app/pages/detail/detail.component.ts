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
import { Observable, Subject, of, takeUntil } from 'rxjs';
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
  private ngUnsubscribe = new Subject<boolean>();



  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  

  get_data() {
    this.olympicService
      .getOlympics()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: Olympic[]) => {
        const countryId:number = +this.route.snapshot.params['id'];
        if (typeof countryId !== 'number') {
          this.router.navigateByUrl('/**/' + countryId);
        }
      
        
        this.country = data[countryId-1];
        console.log("currentCountry dans detailComponent:", countryId, this.country);
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
    
    //console.log("countryId:", countryId);
    this.get_data();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Participation } from '../../core/models/Participation';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  countryName!: string;
  country!: Olympic;
  totalNumberOfMedals!: number;
  numberOfParticipations!: number;
  totalNumberOfAthletes!: number;
  participations!: Participation[];
  public olympics$!: Observable<Olympic[]>;
  private ngUnsubscribe$!: Subject<boolean>;
  public len: number = 0;

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get_data(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data: Olympic[]) => {
        const countryId: number = +this.route.snapshot.params['id'];

        this.country = data[countryId - 1];

        this.olympicService.getNumberOfOlympicItems().subscribe((numItems) => {
          this.len = numItems;
        });
        if (
          (this.len && this.len > 0 &&  (countryId > this.len || countryId === 0)) || isNaN(countryId)
        ) {
          this.goTo(countryId);
        }

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
  goTo(countryId: number): void {
    this.forceDestroy();
    this.router.navigateByUrl('/not-found/' + countryId);
  }
  ngUpdateView(): void {
    this.get_data();
  }
  ngOnInit(): void {
    this.ngUnsubscribe$ = new Subject<boolean>();
    this.get_data();
  }
  forceDestroy(): void {
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }

  ngOnDestroy(): void {
    this.forceDestroy();
  }
}

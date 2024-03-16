import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  numberOfCountries!: number;
  listOfCountries!: string[];
  totalJO!: number;
  totalMedalsByCountry: {id:number,  country: string; medals: number }[] = [];
  private ngUnsubscribe = new Subject<boolean>();


  constructor(private olympicService: OlympicService) {}

  get_data(){
    this.olympicService
      .getOlympics()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: Olympic[]) => {
        this.numberOfCountries = data.length; // Nombre de pays

        this.listOfCountries = data.map((country) => country.country); // Liste des pays

        // Pour le nombre total de JO, on doit compter toutes les participations uniques
        this.totalJO = new Set(
          data.flatMap((country) => country.participations.map((participation) => participation.year))
        ).size;

        // Création d'un attribut pour chaque pays avec la somme totale de ses médailles
        this.totalMedalsByCountry = data.map((country) => ({
          id: country.id,
          country: country.country,
          medals: country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0),
        }));
      });
  }

  ngOnInit() {
    this.get_data();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
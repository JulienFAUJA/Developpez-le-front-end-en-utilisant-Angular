import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  phrase!: string;
  @Input() elem_id!:number;
  public not_found_phrases:string[] = [
    "Tu croyais que cet id était réservé pour la Terre du Milieu ? Ils ne se sont pas qualifiés, ils se sont fait Saquet.",
    "Cet id était pour Pandora, mais ils sont restés dans l'équipe bleue.",
    "Cet id était pour Poudlard, mais ils ont triché au tirage au 'sort'.",
    "Wakanda a réclamé cet id, mais ils se sont retirés pour protéger leur technologie.",
    "Tatooine avait cet id, mais ils ont perdu en essayant de se qualifier par la FORCE.",
    "Cet id appartenait à Narnia, mais ils se sont perdus dans le placard.",
    "Gallifrey a réclamé cet id, mais ils ont été retardés par une anomalie temporelle.",
    "Westeros n'est pas venu, ils ne voulaient pas monter sur le podium, seulement sur le trône.",
    "Asgard a revendiqué cet id, mais ils ont été distraits par une querelle de famille entre les dieux.",
    "cet id était pour Atlantis, mais ils sont restés 'vagues' sur leur participation."
    ];
    public current_phrase!:string; 


  constructor(private route: ActivatedRoute) { }
  
  onRefresh(){
    const countryId:number= +this.route.snapshot.params['id'];
    const phrase_id:number = countryId%this.not_found_phrases.length;
    this.current_phrase= this.not_found_phrases[phrase_id];
    
  }
  ngOnInit(): void {
   this.onRefresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const countryId:number= +this.route.snapshot.params['id'];
    if (changes['countryId']) {
      this.onRefresh();
    }
  }

}

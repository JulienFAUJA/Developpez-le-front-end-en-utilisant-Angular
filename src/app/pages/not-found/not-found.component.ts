import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  phrase!: string;
  @Input() elem_id!:number;
  public not_found_phrase$!: Observable<string>;


  constructor() { }

  ngOnInit(): void {
    this.phrase= "erreur avec l'id: "+this.elem_id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['elem_id']) {
      this.phrase= "erreur avec l'id: "+this.elem_id;
    }
  }

}

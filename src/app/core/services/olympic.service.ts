import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  // Charge les données initiales
  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((olympics) => this.getDistinctOlympics(olympics)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]); // Réinitialise les données en cas d'erreur
        return throwError(error); // Propage l'erreur
      })
    );
  }

  // Obtient les données olympiques
  public getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  public getOlympicById(id: number): Observable<boolean> {
    return this.getOlympics().pipe(
      map((olympics) => olympics.some((olympic) => olympic.id === id))
    );
  }

  public getDistinctOlympics(olympics: Olympic[]): void {
    let countries_void = new Set<string>();
    this.olympics$.next(
      olympics.filter(
        (olympic) =>
          !countries_void.has(olympic.country) &&
          countries_void.add(olympic.country)
      )
    );
  }

  // Méthode pour obtenir le nombre d'éléments de premier niveau dans les données olympiques
  public getNumberOfOlympicItems(): Observable<number> {
    return this.olympics$.pipe(map((olympics) => olympics.length));
  }
}

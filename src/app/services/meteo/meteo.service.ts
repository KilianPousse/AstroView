import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MeteoService {

  RESET_API: string = 'http://localhost:3080/meteo';

  constructor(private httpClient: HttpClient) { }

  getMeteo(lat: number, lon: number): Observable<any> {
    // Ajouter lat et lon dans l'URL de l'API
    const url = `${this.RESET_API}?lat=${lat}&lon=${lon}`;  
    console.log('Récupération de la météo:', url);
    return this.httpClient.get(url).pipe(
      catchError(error => {
        console.error('API error:', error);
        return throwError(() => new Error('Something went wrong while fetching the Meteo.'));
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
//import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class AstrosService {

  RESET_API: string = 'http://localhost:3080/astros';

  constructor(private httpClient: HttpClient) { }

  getAstros(): Observable<any> {
    return this.httpClient.get(`${this.RESET_API}`).pipe(
      catchError(error => {
        console.error('API error:', error);  // Log the error to console
        return throwError(() => new Error('Erreur avec l\'API d\'Atros'));
      })
    );
  }
}

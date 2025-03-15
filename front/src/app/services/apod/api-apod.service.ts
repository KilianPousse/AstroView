import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ApiApodService {

  RESET_API: string = 'http://localhost:3080/apod';

  constructor(private httpClient: HttpClient) { }

  getAPOD(): Observable<any> {
    return this.httpClient.get(`${this.RESET_API}`).pipe(
      catchError(error => {
        console.error('API error:', error);  // Log the error to console
        return throwError(() => new Error('Something went wrong while fetching the APOD.'));
      })
    );
  }
  
}

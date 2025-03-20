import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})

export class IssService {

  RESET_API: string = 'http://localhost:3080/iss';

  constructor(private httpClient: HttpClient) { }

  getISS(): Observable<any> {
    return this.httpClient.get(`${this.RESET_API}`).pipe(
      catchError(error => {
        console.error('API ISS Error:', error);
        return throwError(() => new Error('Erreur liée à l\'API de l\'ISS'));
      })
    );
  }
}

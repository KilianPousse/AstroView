import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as satellite from 'satellite.js';

@Injectable({
  providedIn: 'root'
})
export class SatService {

  RESET_API: string = 'http://localhost:3080/celestrak';

  constructor(private httpClient: HttpClient) { }

  getSat(id: number): Observable<any> {
    const url = `${this.RESET_API}?id=${id}`;
    console.log('Récupération des infos du satellite:', id);

    return this.httpClient.get<any>(url).pipe(
      map(data => {
        if (!data.tle1 || !data.tle2) {
          throw new Error('Données TLE manquantes');
        }

        const satrec = satellite.twoline2satrec(data.tle1, data.tle2);
        const now = new Date();
        const posAndVel = satellite.propagate(satrec, now);

        // Vérifier si posAndVel.position est valide (type EciVec3<number>)
        if (!posAndVel.position || typeof posAndVel.position !== 'object' || !posAndVel.position.x || !posAndVel.position.y || !posAndVel.position.z) {
          throw new Error('Impossible de calculer la position, données invalides');
        }

        const gmst = satellite.gstime(now);
        const posGd = satellite.eciToGeodetic(posAndVel.position, gmst);

        const sat = {
          id: id,
          name: data.name.trim(),
          lat: satellite.degreesLat(posGd.latitude),
          lon: satellite.degreesLong(posGd.longitude)
        };

        return sat;
      }),
      catchError(error => {
        console.error('Erreur API celestrak:', error);
        return throwError(() => new Error('Erreur lors de la récupération des données du satellite: ' + error.message));
      })
    );
  }
}

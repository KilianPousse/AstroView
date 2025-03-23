import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PositionService {
  constructor() {}

  getPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(`Erreur de géolocalisation: ${error.message}`);
          }
        );
      }
      else {
        reject('La géolocalisation n\'est pas supportée par ce navigateur.');
      }
    });
  }
}

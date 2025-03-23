import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../../services/meteo/meteo.service';
import { PositionService } from '../../services/position/position.service';

@Component({
  selector: 'app-meteo-box',
  templateUrl: './meteo-box.component.html',
  styleUrls: ['./meteo-box.component.css']
})

export class MeteoBoxComponent implements OnInit {
  meteo: any = null;
  
  descriptions: { [key: number]: string } = {
    0: "Ensoleillé",
    1: "Partiellement nuageux",
    2: "Nuageux",
    3: "Pluie légère",
    4: "Pluie modérée",
    5: "Pluie forte",
    6: "Pluie très forte",
    7: "Neige légère",
    8: "Neige modérée",
    9: "Neige forte",
    10: "Bruine légère",
    11: "Bruine modérée",
    12: "Bruine forte",
    13: "Tempête de neige",
    14: "Averse de pluie légère",
    15: "Averse de pluie modérée",
    16: "Averse de pluie forte",
    17: "Averse de neige légère",
    18: "Averse de neige modérée",
    19: "Averse de neige forte",
    20: "Orage faible",
    21: "Orage modéré",
    22: "Orage fort",
    23: "Brouillard",
    24: "Conditions variables"
  };
  

  // Coordonnées de l'utilisateur (lat et lon à obtenir via géolocalisation)
  lat = 48.01;
  lon = 5.18;

  meteoDescription: string = "???"; 
  weatherCode: number = 1;
  imgSrc: string = `./meteo/${this.weatherCode}.png`; 
  temperature: number = 0.0
  vent: number = 0.0 

  constructor(private api: MeteoService, private position: PositionService) { }

  ngOnInit(): void {

    // Recuperation de la localisation
    this.position.getPosition().then(pos => {
      this.lat = pos.latitude;
      this.lon = pos.longitude;
    });

    // Appel à l'API pour récupérer la météo
    this.api.getMeteo(this.lat, this.lon).subscribe(res => {
      console.log('Récupération de la météo', res);
      this.meteo = res;

      // Une fois les données de météo récupérées, attribuer la description
      if(this.meteo && this.meteo.current_weather) {
        this.weatherCode = this.meteo.current_weather['weathercode'];
        
        // Récupérer la description en fonction du code météo
        this.meteoDescription = this.descriptions[this.weatherCode] || "Condition Inconnue";

        this.temperature = this.meteo.current_weather['temperature'];
        this.vent = this.meteo.current_weather['windspeed'];
      }

      if(this.meteoDescription !== "Condition Inconnue") {
        // Mettre à jour le chemin de l'image
        this.imgSrc = `./meteo/${this.weatherCode}.png`;
      }
    });
  }
}

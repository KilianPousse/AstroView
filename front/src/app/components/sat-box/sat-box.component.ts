import { Component, OnInit } from '@angular/core';
import { SatService } from '../../services/sat/sat.service';

@Component({
  selector: 'app-sat-box',
  templateUrl: './sat-box.component.html',
  styleUrls: ['./sat-box.component.css']
})

export class SatBoxComponent implements OnInit {

  iss: any = {};

  constructor(private api: SatService) { }

  ngOnInit() {
    this.api.getSat(25544).subscribe({
      next: (data) => {
        console.log("Données du satellite reçues:", data);
        this.iss = data; 
      },
      error: (err) => console.error("Erreur lors de la récupération du satellite:", err)
    });
  }

  
}





/*

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-sat-box',
  templateUrl: './sat-box.component.html',
  styleUrls: ['./sat-box.component.css']
})
export class SatBoxComponent implements OnInit {

  map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    console.log("Initializing map...");
    this.initializeMap();
  }
}

initializeMap(): void {
  this.map = L.map('map').setView([48.8566, 2.3522], 13);
  console.log("Map initialized:", this.map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
}

}
*/

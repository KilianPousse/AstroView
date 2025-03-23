import { Component, OnInit } from '@angular/core';
import { SatService } from '../../services/sat/sat.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-sat-box',
  templateUrl: './sat-box.component.html',
  styleUrls: ['./sat-box.component.css']
})

export class SatBoxComponent implements OnInit {

  iss: any = {};
  private map: L.Map | null = null;

  constructor(private api: SatService) { }

  ngOnInit(): void {
    this.api.getSat(25544).subscribe({
      next: (data) => {
        console.log("Données du satellite reçues:", data);
        this.iss = data; // Mettre à jour les données une fois récupérées
      },
      error: (err) => console.error("Erreur lors de la récupération du satellite:", err)
    });

    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
  
}
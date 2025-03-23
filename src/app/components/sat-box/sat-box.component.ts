import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatService } from '../../services/sat/sat.service';
import { PositionService } from '../../services/position/position.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-sat-box',
  standalone: true, // Si c'est un standalone component
  imports: [CommonModule],  // <-- Ajout de CommonModule ici
  templateUrl: './sat-box.component.html',
  styleUrls: ['./sat-box.component.css']
})
export class SatBoxComponent implements OnInit {

  lat = 48.01;
  lon = 5.18;
  zoom = 1;
  private map: L.Map | null = null;

  // Liste des satellites avec leur ID et leur icône
  satellites = [
    { id: 25544, icon: './iss.png' },       
    { id: 44714, icon: './starlink.png' },  
    { id: 20580, icon: './hubble.png' }   ,  
    { id: 10321, icon: './voyager.png' } ,  
    { id: 29401, icon: './newhoriz.png' } ,  
    { id: 37773, icon: './juno.png' }   
  ];

  sats: any[] = [];

  constructor(private api: SatService, private position: PositionService) { }

  ngOnInit(): void {
    // Récupérer la position initiale de l'utilisateur
    this.position.getPosition().then(pos => {
      this.lat = pos.latitude;
      this.lon = pos.longitude;
      if (this.map) {
        this.map.setView([this.lat, this.lon], this.zoom);
      }
    });

    // Initialiser la carte
    this.map = L.map('map').setView([this.lat, this.lon], this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Charger les satellites dynamiquement
    this.satellites.forEach(sat => {
      this.api.getSat(sat.id).subscribe({
        next: (data) => {
          console.log(`Données du satellite ${sat.id} reçues:`, data);
          const item = { ...data, icon: sat.icon };
          this.sats.push(item);

          if (this.map && data.lat && data.lon) {
            const icon = L.icon({
              iconUrl: sat.icon,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
              popupAnchor: [0, -16]
            });

            L.marker([data.lat, data.lon], { icon })
              .addTo(this.map)
              .bindPopup(`Nom: ${data.name}<br>Lat: ${data.lat}<br>Lon: ${data.lon}`)
              .openPopup();
          }
        },
        error: (err) => console.error(`Erreur lors de la récupération du satellite ${sat.id}:`, err)
      });
    });
  }
}

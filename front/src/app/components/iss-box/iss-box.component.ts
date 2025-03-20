// map.component.ts
import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-iss-box',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class IssBoxComponent implements AfterViewInit {
  @Input() latitude: number = 48.8566; // Latitude par défaut (Paris)
  @Input() longitude: number = 2.3522; // Longitude par défaut (Paris)
  
  private map: L.Map | undefined;

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Localisation')
      .openPopup();
  }
}

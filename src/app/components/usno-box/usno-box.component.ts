import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsnoService } from '../../services/usno/usno.service';
import { PositionService } from '../../services/position/position.service';
import { DatePipe } from '@angular/common';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-usno-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './usno-box.component.html',
  styleUrl: './usno-box.component.css'
})
export class UsnoBoxComponent implements OnInit {
  // État
  loading = false;
  errorMessage: string | null = null;
  celestialData: any = null;

  // Formulaire
  date: string = '';
  time: string = '';
  latitude: number = 48.8566; // Paris par défaut
  longitude: number = 2.3522;

  constructor(
    private usnoService: UsnoService,
    private positionService: PositionService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Initialisation avec date et heure actuelles
    const now = new Date();
    this.date = this.formatDateForInput(now);
    this.time = this.formatTimeForInput(now);

    // Tenter d'obtenir la position au chargement si l'utilisateur le permet
    this.getMyLocation();
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatTimeForInput(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  formatDisplayDate(dateStr: string): string {
    const date = new Date(dateStr);
    return this.datePipe.transform(date, 'dd/MM/yyyy') || dateStr;
  }

  formatDateForDisplay(dateStr: string | Date): string {
    if (dateStr instanceof Date) {
      const day = String(dateStr.getDate()).padStart(2, '0');
      const month = String(dateStr.getMonth() + 1).padStart(2, '0');
      const year = dateStr.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getMyLocation(): void {
    this.loading = true;
    this.errorMessage = null;

    this.positionService.getPosition()
      .then(position => {
        this.latitude = parseFloat(position.latitude.toFixed(4));
        this.longitude = parseFloat(position.longitude.toFixed(4));
        this.loading = false;
      })
      .catch(error => {
        console.error('Erreur de géolocalisation:', error);
        // On continue quand même avec les coordonnées par défaut
        this.loading = false;
      });
  }

  getCelestialData(): void {
    console.log('Demande des données célestes...');
    this.loading = true;
    this.errorMessage = null;

    console.log(`Paramètres: date=${this.date}, time=${this.time}, lat=${this.latitude}, lon=${this.longitude}`);

    this.usnoService.getCelestialData(
      this.date,
      this.time,
      this.latitude,
      this.longitude
    ).subscribe({
      next: (data) => {
        console.log('Données reçues:', data);

        // Vérifier les propriétés principales
        console.log('sundata présent:', !!data.sundata);
        console.log('moondata présent:', !!data.moondata);
        console.log('planets présent:', !!data.planets, data.planets?.length);
        console.log('stars présent:', !!data.stars, data.stars?.length);

        this.celestialData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.errorMessage = `Erreur: ${error.message || 'Impossible de récupérer les données célestes'}`;
        this.loading = false;
      }
    });
  }

  isCelestialObjectVisible(altitude?: number): boolean {
    return this.usnoService.isCelestialObjectVisible(altitude);
  }

  getCardinalDirection(azimuth: number): string {
    return this.usnoService.getCardinalDirection(azimuth);
  }

  getPlanetImage(name: string): string {
    return this.usnoService.getPlanetImage(name);
  }
}
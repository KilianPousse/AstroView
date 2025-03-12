import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ApiApodService } from '../../services/apod/api-apod.service';


@Component({
  selector: 'app-apod-box',
  imports: [
    CommonModule,
  ],
  templateUrl: './apod-box.component.html',
  styleUrls: ['./apod-box.component.css']
})
export class ApodBoxComponent {
  apod: any = null;

  constructor(private api: ApiApodService) { }

  ngOnInit(): void {
    this.api.getAPOD().subscribe({
      next: (res) => {
        console.log('Récupération de l\'APOD');
        this.apod = res;
      },
      error: (err) => {
        console.error('fetchAPOD a échoué: ', err);
      }
    });
  }

  // Définir les méthodes onImageLoad et onImageError
  onImageLoad() {
    console.log("Image chargée avec succès !");
  }

  onImageError() {
    console.error("Erreur lors du chargement de l'image !");
  }
}

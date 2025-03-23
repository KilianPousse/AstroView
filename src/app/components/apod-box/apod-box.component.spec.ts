import { Component } from '@angular/core';
import { ApiApodService } from '../../services/apod/api-apod.service';
import { CommonModule } from '@angular/common'; // Import de CommonModule

@Component({
  selector: 'app-apod-box',
  standalone: true,
  imports: [
    CommonModule, // Ajout de CommonModule ici
  ],
  templateUrl: './apod-box.component.html',
  styleUrls: ['./apod-box.component.css']  // Correction ici
})
export class ApodBoxComponent {

  apod: any;

  constructor(private api: ApiApodService) { }

  ngOnInit(): void {
    this.api.getAPOD().subscribe(res => {
      console.log(res);
      this.apod = res;
    });
  }

}

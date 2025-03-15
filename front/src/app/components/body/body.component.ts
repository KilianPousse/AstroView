import { Component } from '@angular/core';
import { MeteoBoxComponent } from '../meteo-box/meteo-box.component';
import { ApodBoxComponent } from '../apod-box/apod-box.component';

@Component({
  selector: 'app-body',
  imports: [
    MeteoBoxComponent,
    ApodBoxComponent,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})

export class BodyComponent {

}

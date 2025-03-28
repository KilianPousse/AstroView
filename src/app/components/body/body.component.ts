import { Component } from '@angular/core';
import { MeteoBoxComponent } from '../meteo-box/meteo-box.component';
import { ApodBoxComponent } from '../apod-box/apod-box.component';
import { AstrosBoxComponent } from '../astros-box/astros-box.component';
import { SatBoxComponent } from '../sat-box/sat-box.component';
import { UsnoBoxComponent } from '../usno-box/usno-box.component';
@Component({
  selector: 'app-body',
  imports: [
    MeteoBoxComponent,
    ApodBoxComponent,
    AstrosBoxComponent,
    SatBoxComponent,
    UsnoBoxComponent,

  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})

export class BodyComponent {

}

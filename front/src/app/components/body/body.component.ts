import { Component } from '@angular/core';
import { MeteoBoxComponent } from '../meteo-box/meteo-box.component';
import { ApodBoxComponent } from '../apod-box/apod-box.component';
//import { IssBoxComponent } from '../iss-box/iss-box.component';
import { AstrosBoxComponent } from '../astros-box/astros-box.component';

@Component({
  selector: 'app-body',
  imports: [
    MeteoBoxComponent,
    ApodBoxComponent,
    //IssBoxComponent,
    AstrosBoxComponent,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})

export class BodyComponent {

}

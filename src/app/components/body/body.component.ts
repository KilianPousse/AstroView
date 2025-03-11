import { Component } from '@angular/core';
import { HomeBoxComponent } from '../home-box/home-box.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    HomeBoxComponent
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}

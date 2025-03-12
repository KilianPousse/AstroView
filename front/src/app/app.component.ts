import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ApodBoxComponent } from './components/apod-box/apod-box.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ApodBoxComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashfront';
}

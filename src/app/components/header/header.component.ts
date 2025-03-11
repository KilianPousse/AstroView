import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ngAfterViewInit(): void {
    
  }

  categories = [
    { title: 'Image du Jour', url: '#dayimg' },
    { title: 'Visualisation', url: '#target' },
    { title: 'Calendier', url: '#calendar' }
  ];

  navList = [...this.categories];  // Initialise navList avec toutes les catégories

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onResize(event: Event) {
      // Fermer le menu si la largeur de la fenêtre dépasse 900px
      if (window.innerWidth > 900) {
        this.menuOpen = false;
      }
    }
  }

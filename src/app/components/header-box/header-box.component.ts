import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-box',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-box.component.html',
  styleUrls: ['./header-box.component.css']
})
export class HeaderBoxComponent {
  navList = [
    { title: 'Contact', url: '#contact' },
    { title: 'A Propos', url: '#about' },
    { title: 'Boloss', url: '#boloss' },
    { title: 'Super', url: '#super' }
  ];

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 900) {
      this.menuOpen = false;
    }
  }
}

import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-box',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-box.component.html',
  styleUrls: ['./header-box.component.css']
})
export class HeaderBoxComponent implements AfterViewInit {
  @ViewChild('menuIcon') menuIcon!: ElementRef;
  @ViewChild('overlayMenu') overlayMenu!: ElementRef;

  navList = [
    { title: 'Contact', url: '#contact' },
    { title: 'A Propos', url: '#about' },
    { title: 'Boloss', url: '#boloss' },
    { title: 'Super', url: '#super' },
    { title: 'Supzsedrftgyhujikolpm^ùr', url: '#super' }
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const menuIcon = this.menuIcon.nativeElement;
    const nav = this.overlayMenu.nativeElement;

    this.renderer.listen(menuIcon, 'click', () => {
      const isOpen = nav.style.transform === 'translateX(0%)';
      nav.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0%)';
      nav.style.transition = 'transform 0.2s ease-out';

      menuIcon.classList.toggle('toggle', !isOpen);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AstrosService } from '../../services/astros/astros.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-astros-box',
  templateUrl: './astros-box.component.html',
  styleUrl: './astros-box.component.css',
  imports: [
    CommonModule
  ]
})

export class AstrosBoxComponent implements OnInit {
  astros: any = null;

  constructor(private api: AstrosService) { }

  ngOnInit(): void {
    this.api.getAstros().subscribe(res => {
      console.log('Récupération des données d\'Astros', res);
      this.astros = res; 
    });
  }
  


}

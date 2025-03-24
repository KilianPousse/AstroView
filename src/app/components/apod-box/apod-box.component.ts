import { Component, OnInit } from '@angular/core';
import { ApiApodService } from '../../services/apod/api-apod.service';


@Component({
  selector: 'app-apod-box',
  templateUrl: './apod-box.component.html',
  styleUrls: ['./apod-box.component.css']
})


export class ApodBoxComponent implements OnInit {
  apod: any = null;

  constructor(private api: ApiApodService) { }

  ngOnInit(): void {
    this.api.getAPOD().subscribe(res => {
      console.log('Récupération de l\'APOD');
      this.apod = res;
      console.log(this.apod);
    });
  }

}

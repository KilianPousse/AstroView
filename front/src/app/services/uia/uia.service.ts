import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UiaService {

  constructor() { }

  activate: boolean = false;


  setUIA(b: boolean) {
    this.activate = b;
  }

  switchUIA() {
    this.activate = !this.activate;
  }

  get() {
    return this.activate;
  }

}

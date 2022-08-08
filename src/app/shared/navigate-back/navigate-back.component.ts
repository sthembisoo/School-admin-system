/* eslint-disable max-len */
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back',
  styleUrls: ['./navigate-back.component.css'],
  template: `<button
    (click)="navigateBack()"
    class=" flex-col m-2 nav-back-btn cursor-pointer un-style-button"
  >
  <img src="https://img.icons8.com/fluency/48/1A1A1A/circled-left-2.png"/>
  </button>`,
})
export class NavigateBackComponent {
    
    constructor(private location: Location,) {}

  public navigateBack() {
    this.location.back();
  }
}

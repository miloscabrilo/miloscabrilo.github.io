import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';

@Component({
    selector: 'home',
    imports: [
        // RouterOutlet,
        //BrowserModule,
        //ImageSliderComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}

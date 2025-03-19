import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


Swiper.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
    selector: 'image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss'],
    imports: [CommonModule]
})
export class ImageSliderComponent implements OnInit {
  public swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
  });
  images: string[] = [
    'assets/image/demetra1.png',
    'assets/image/demetra2.png',
    'assets/image/demetra3.png',
    'assets/image/demetra4.png',
    'assets/image/demetra5.png',
    'assets/image/demetra6.png',
  ];

  config = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
  };

  

  constructor() { }

  ngOnInit(): void { }
}

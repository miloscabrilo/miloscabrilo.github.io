import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

Swiper.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss',
  imports: [CommonModule],
  standalone: true,
})
export class ImageSliderComponent implements OnInit {
  readonly images = signal<string[]>([
    'assets/image/demetra1.png',
    'assets/image/demetra2.png',
    'assets/image/demetra3.png',
    'assets/image/demetra4.png',
    'assets/image/demetra5.png',
    'assets/image/demetra6.png',
  ]);

  swiper = new Swiper('.swiper-container', {
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

  config = {
    direction: 'horizontal' as const,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    pagination: { clickable: true },
    loop: true,
  };

  ngOnInit(): void {}
}

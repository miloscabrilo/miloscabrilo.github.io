import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'about-us',
  imports: [TranslatePipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  standalone: true,
})
export class AboutUsComponent {}

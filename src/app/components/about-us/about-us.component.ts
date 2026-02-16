import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'about-us',
  imports: [TranslatePipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  standalone: true,
})
export class AboutUsComponent {
  readonly themeService = inject(ThemeService);
}

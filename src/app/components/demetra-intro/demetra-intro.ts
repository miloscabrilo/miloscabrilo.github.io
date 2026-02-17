import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'demetra-intro',
  imports: [TranslatePipe],
  templateUrl: './demetra-intro.html',
  styleUrl: './demetra-intro.scss',
  standalone: true,
})
export class DemetraIntroComponent {
  private readonly themeService = inject(ThemeService);

  public getThemedIconFolder(): string {
    return this.themeService.iconFolder();
  }
}

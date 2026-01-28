import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiStateService } from './services/ui-state.service';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public ui = inject(UiStateService);
  protected readonly title = this.ui.theme() === 'dark' ? 'Daniel Web Dark' : 'Daniel Web';
}
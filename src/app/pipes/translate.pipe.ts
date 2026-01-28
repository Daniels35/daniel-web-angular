import { Pipe, PipeTransform, inject } from '@angular/core';
import { UiStateService } from '../services/ui-state.service';
import translations from '../../../public/i18n/lang.json';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Re-evalúa cuando cambie el estado
})
export class TranslatePipe implements PipeTransform {
  private uiState = inject(UiStateService);

  transform(key: string): string {
    const lang = this.uiState.language();
    return (translations as any)[lang][key] || key;
  }
}
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  // Usamos WritableSignals para un manejo de estado reactivo y moderno
  language = signal<string>('es');
  theme = signal<'light' | 'dark'>('dark');

  constructor() {
    // Persistencia básica (solo corre en el cliente)
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      if (savedLang) this.language.set(savedLang);
      
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) this.theme.set(savedTheme as 'light' | 'dark');
    }

    // Efecto para guardar cambios automáticamente
    effect(() => {
      localStorage.setItem('lang', this.language());
      localStorage.setItem('theme', this.theme());
      document.documentElement.setAttribute('data-theme', this.theme());
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  setLanguage(lang: string) {
    this.language.set(lang);
  }
}
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  language = signal<string>('es');
  theme = signal<'light' | 'dark'>('dark');
  showSwitcher = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      if (savedLang) this.language.set(savedLang);
      
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) this.theme.set(savedTheme as 'light' | 'dark');
    }

    effect(() => {
      localStorage.setItem('lang', this.language());
      localStorage.setItem('theme', this.theme());
      document.documentElement.setAttribute('data-theme', this.theme());
    });
  }

  toggleSwitcher() {
    this.showSwitcher.update(s => !s);
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  setLanguage(lang: string) {
    this.language.set(lang);
  }
}
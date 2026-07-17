import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="site-header">
      <a routerLink="/" class="wordmark" aria-label="Learn Angular home">Learn Angular</a>
      <span>Interview prep, one executable idea at a time</span>
    </header>
    <router-outlet />
  `,
})
export class App {}

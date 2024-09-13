import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  /* prenumerera på router events för att lyssna efter nav förändring */
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // vid lyckad navigering...
        this.isMenuOpen = false; // ...stäng menyn
      }
    });
  }

  /* toggla responsiv meny */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

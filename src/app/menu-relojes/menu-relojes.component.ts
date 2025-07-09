import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-menu-relojes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './menu-relojes.component.html',
  styleUrls: ['./menu-relojes.component.css']
})
export class MenuRelojesComponent {
  relojes = [
    { name: 'Reloj Digital', path: 'digital' },
    { name: 'Reloj Analógico', path: 'analogico' },
    { name: 'Reloj Binario', path: 'binario' },
    { name: 'Reloj Hexadecimal', path: 'hexadecimal' },
    { name: 'Reloj en Palabras', path: 'palabras' },
    { name: 'Reloj Mundial', path: 'mundial' },
    { name: 'Cronómetro', path: 'cronometro' },
    { name: 'Temporizador', path: 'temporizador' },
    { name: 'Reloj de Color', path: 'color' },
    { name: 'Reloj Fibonacci', path: 'fibonacci' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  
  ) { }

  logout(): void {
    console.log('Intentando cerrar sesión...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}
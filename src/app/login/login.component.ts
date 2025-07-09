import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Importa RouterLink
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterLink], // Añade RouterLink a imports
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit() {
    this.error = ''; // Limpiar errores previos
    this.success = ''; // Limpiar éxitos previos

    const loggedIn = this.authService.login(this.username, this.password);

    if (loggedIn) {
      this.success = '¡Login exitoso, diva! Preparando tu entrada triunfal.';
      this.username = ''; // Limpiar campos
      this.password = ''; // Limpiar campos
      // Redirigir al menú de relojes después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/menu']); // Redirige a '/menu' que está protegida
      }, 2000);
    } else {
      this.error = '¡Ups! Usuario o contraseña incorrectos. Revisa tu glamour.';
    }
  }
}
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterLink], 
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  success = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  handleRegister() {
    this.error = ''; // Limpiar errores previos
    this.success = ''; // Limpiar éxitos previos

    // Validar la contraseña antes de intentar el registro
    if (!this.authService.validatePassword(this.password)) {
      this.error =
        '¡Ay, no! La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial (ej: !@#$%). ¡Ponte más creativa!';
      return;
    }

    const registered = this.authService.register(this.username, this.password);

    if (registered) {
      this.success = '¡Registro exitoso! Prepárate para brillar. Redirigiendo para iniciar sesión...';
      this.username = ''; // Limpiar campos
      this.password = ''; // Limpiar campos
      // Redirige al login después de 2 segundos para que el usuario inicie sesión
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.error = '¡Uy! El nombre de usuario ya existe o hubo un problema al registrar. ¡Intenta con otro más fabuloso!';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
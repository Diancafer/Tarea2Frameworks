import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private users: { username: string; passwordHash: string }[] = [];
  private currentUser: string | null = null; // Para saber quién está logueado

  constructor() {
    
    const storedUsers = localStorage.getItem('appUsers');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
     
    }
  }

  /**
   
   * @param username El nombre de usuario.
   * @param passwordPlain La contraseña en texto plano.
   * @returns true si el registro fue exitoso, false si el usuario ya existe o la contraseña no es válida.
   */
  register(username: string, passwordPlain: string): boolean {
    // 1. Verificar si el usuario ya existe
    if (this.users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
      console.warn('Intento de registro fallido: El nombre de usuario ya existe.');
      return false; // El usuario ya existe
    }

    // 2. Validar la complejidad de la contraseña antes de registrarla
    if (!this.validatePassword(passwordPlain)) {
      console.warn('Intento de registro fallido: Contraseña no cumple los requisitos.');
      return false; // La contraseña no cumple los requisitos
    }

   
    const passwordHash = btoa(passwordPlain);

   
    this.users.push({ username, passwordHash });
    this.saveUsers(); // Guardar en localStorage

    console.log('Usuario registrado exitosamente:', username);
    return true; // Registro exitoso
  }

  /**
   * Intenta iniciar sesión con las credenciales proporcionadas.
   * @param username El nombre de usuario.
   * @param passwordPlain La contraseña en texto plano.
   * @returns true si el inicio de sesión fue exitoso, false en caso contrario.
   */
  login(username: string, passwordPlain: string): boolean {
    const user = this.users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (user && user.passwordHash === btoa(passwordPlain)) { // Comparar con el hash simple
      this.currentUser = username; // Establecer el usuario actual
      console.log('Inicio de sesión exitoso:', username);
      return true;
    }
    console.warn('Inicio de sesión fallido: Credenciales incorrectas para:', username);
    return false;
  }

  /**
   * Verifica si hay un usuario actualmente logueado.
   * @returns true si hay un usuario logueado, false en caso contrario.
   */
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout(): void {
    this.currentUser = null;
    console.log('Sesión cerrada.');
  }

  /**
   * Obtiene el nombre del usuario actualmente logueado.
   * @returns El nombre de usuario o null si no hay nadie logueado.
   */
  getCurrentUser(): string | null {
    return this.currentUser;
  }

  /**
   * Valida la complejidad de la contraseña.
   * @param password La contraseña a validar.
   * @returns true si la contraseña cumple los requisitos, false en caso contrario.
   */
  validatePassword(password: string): boolean {
    // Al menos 8 caracteres
    // Al menos una mayúscula
    // Al menos una minúscula
    // Al menos un número
  
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    // Un carácter especial simple, puedes expandir esta expresión regular
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  }

  /**
   * Guarda el array de usuarios en el localStorage del navegador.
   * @private
   */
  private saveUsers(): void {
    localStorage.setItem('appUsers', JSON.stringify(this.users));
  }
}
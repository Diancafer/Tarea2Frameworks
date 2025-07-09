import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-hexadecimal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-hexadecimal.component.html',
  styleUrls: ['./reloj-hexadecimal.component.css'],
})
export class RelojHexadecimalComponent implements OnInit {
  hexTime: string = ''; // Usaremos una sola propiedad para la cadena hexadecimal
  private time: Date = new Date(); // Usamos 'time' para mantener el estado interno

  ngOnInit(): void {
    this.updateHexTime();
    setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1); // Incrementa el tiempo interno
      this.updateHexTime();
    }, 1000);
  }

  /**
   * Actualiza la cadena de tiempo hexadecimal.
   */
  private updateHexTime(): void {
    const hours = this.time.getHours();
    const minutes = this.time.getMinutes();
    const seconds = this.time.getSeconds(); // Corregido: obtener segundos de this.time

    // Convertir a hexadecimal y asegurar dos dígitos con padStart para minutos/segundos
    // Las horas se pueden mostrar con un solo dígito si son < 10 (A-F)
    const hexHours = hours.toString(16).toUpperCase();
    const hexMinutes = minutes.toString(16).toUpperCase().padStart(2, '0');
    const hexSeconds = seconds.toString(16).toUpperCase().padStart(2, '0'); // <-- CORREGIDO aquí

    this.hexTime = `${hexHours}:${hexMinutes}:${hexSeconds}`;
  }

  /**
   * Ajusta la hora del reloj hexadecimal manualmente.
   * @param event El evento de cambio del input de tipo 'time'.
   */
  adjustTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
      this.time.setHours(hours);
      this.time.setMinutes(minutes);
      this.time.setSeconds(0); // Reinicia los segundos al ajustar
      this.updateHexTime(); // Actualiza la visualización
    }
  }
}
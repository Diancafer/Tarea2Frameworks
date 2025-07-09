import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-color.component.html',
  styleUrls: ['./reloj-color.component.css']
})
export class RelojColorComponent implements OnInit {
  backgroundColor: string = '#000000'; // Negro por defecto
  displayTime: string = '';

  ngOnInit(): void {
    this.updateColorAndDisplay();
    setInterval(() => this.updateColorAndDisplay(), 1000);
  }

  private updateColorAndDisplay(): void {
    const now = new Date();
    const hours = now.getHours();   // 0-23
    const minutes = now.getMinutes(); // 0-59
    const seconds = now.getSeconds(); // 0-59

    // Normalizar la hora a un valor entre 0 y 1 para mapear al color
    // Consideramos 24 horas.
    // Haremos que la hora sea un valor de brillo.
    // Por ejemplo, 00:00 -> muy oscuro, 12:00 -> más claro, 23:59 -> oscuro de nuevo

    // Convertir tiempo a un valor único entre 0 y 1 para brillo (HSL-L) o intensidad (RGB)
    // Mapeamos 00:00 a 0, 12:00 a 255 (o un valor alto), y 23:59 de vuelta a 0
    const totalMinutesOfDay = (hours * 60) + minutes; // Total de minutos transcurridos en el día
    const maxMinutesOfDay = 24 * 60; // 1440 minutos en un día

    // Calcular un valor de brillo. Por ejemplo, de 0 (00:00) a 255 (12:00) y de vuelta a 0 (24:00)
    let brightnessValue: number;
    if (hours < 12) {
      brightnessValue = Math.floor((totalMinutesOfDay / (12 * 60)) * 255);
    } else {
      // De 12:00 a 23:59, la luminosidad disminuye.
      // Invertimos la escala: 12:00 es el punto más claro. 24:00 (00:00) es el más oscuro.
      const minutesFromNoon = totalMinutesOfDay - (12 * 60);
      brightnessValue = 255 - Math.floor((minutesFromNoon / (12 * 60)) * 255);
    }

    // Asegurarse de que el valor esté entre 0 y 255
    brightnessValue = Math.max(0, Math.min(255, brightnessValue));

    // Usamos este valor para un color monocromático (escala de grises)
    const hexBrightness = brightnessValue.toString(16).padStart(2, '0');
    this.backgroundColor = `#${hexBrightness}${hexBrightness}${hexBrightness}`;

    // Para el display de la hora
    this.displayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  adjustTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
      const adjustedDate = new Date();
      adjustedDate.setHours(hours, minutes, 0);
      this.updateColorAndDisplayWithDate(adjustedDate);
    }
  }

  private updateColorAndDisplayWithDate(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const totalMinutesOfDay = (hours * 60) + minutes;
    const maxMinutesOfDay = 24 * 60;

    let brightnessValue: number;
    if (hours < 12) {
      brightnessValue = Math.floor((totalMinutesOfDay / (12 * 60)) * 255);
    } else {
      const minutesFromNoon = totalMinutesOfDay - (12 * 60);
      brightnessValue = 255 - Math.floor((minutesFromNoon / (12 * 60)) * 255);
    }

    brightnessValue = Math.max(0, Math.min(255, brightnessValue));
    const hexBrightness = brightnessValue.toString(16).padStart(2, '0');
    this.backgroundColor = `#${hexBrightness}${hexBrightness}${hexBrightness}`;

    this.displayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
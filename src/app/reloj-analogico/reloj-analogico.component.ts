import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-reloj-analogico',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './reloj-analogico.component.html',
  styleUrls: ['./reloj-analogico.component.css'],
})
export class RelojAnalogicoComponent implements OnInit {
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  hourAngle: number = 0;
  minuteAngle: number = 0;
  secondAngle: number = 0;

  ngOnInit(): void {
    this.updateClock();
    // Actualiza el reloj cada segundo
    setInterval(() => this.updateClock(), 1000);
  }

  /**
   * Actualiza la hora actual y calcula los ángulos de las manecillas.
   */
  updateClock(): void {
    const now = new Date();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
    this.calculateAngles();
  }

  /**
   * Ajusta la hora del reloj manualmente a través de la entrada del usuario.
   * @param event El evento de cambio del input de tipo 'time'.
   */
  adjustTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
      // Ajustamos a formato de 12 horas para el cálculo del ángulo de la hora
      // (aunque internamente se guarda en 24h para consistencia con Date)
      this.hour = hours;
      this.minute = minutes;
      this.second = 0; // Reiniciamos los segundos al ajustar manualmente
      this.calculateAngles();
    }
  }

  /**
   * Calcula los ángulos de rotación para las manecillas de hora, minuto y segundo.
   * Los ángulos se basan en 360 grados para un círculo completo.
   */
  calculateAngles(): void {
    // Ángulo de la manecilla de la hora:
    // (Horas % 12) * 30 grados por hora
    // + Minutos * 0.5 grados por minuto (para que la manecilla de la hora se mueva suavemente)
    this.hourAngle = ((this.hour % 12) * 30) + (this.minute * 0.5);

    // Ángulo de la manecilla de los minutos:
    // Minutos * 6 grados por minuto
    // + Segundos * 0.1 grados por segundo (para que la manecilla de los minutos se mueva suavemente)
    this.minuteAngle = (this.minute * 6) + (this.second * 0.1);

    // Ángulo de la manecilla de los segundos:
    // Segundos * 6 grados por segundo
    this.secondAngle = this.second * 6;
  }
}
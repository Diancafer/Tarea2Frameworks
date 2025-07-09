import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs'; // Importa Subscription

@Component({
  selector: 'app-reloj-digital',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-digital.component.html',
  styleUrls: ['./reloj-digital.component.css'],
})
export class RelojDigitalComponent implements OnDestroy { // Implementa OnDestroy
  hours: number = new Date().getHours();
  minutes: number = new Date().getMinutes();
  seconds: number = new Date().getSeconds();

  private clockSubscription: Subscription; // Declara una propiedad para la suscripción

  constructor() {
    this.clockSubscription = interval(1_000).subscribe(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
      if (this.minutes === 60) {
        this.minutes = 0;
        this.hours++;
      }
      if (this.hours === 24) {
        this.hours = 0;
      }
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse cuando el componente se destruye
    if (this.clockSubscription) {
      this.clockSubscription.unsubscribe();
    }
  }

  adjustTime(event: Event) {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);

    if (!isNaN(hours) && !isNaN(minutes)) {
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = 0;
    }
  }
}
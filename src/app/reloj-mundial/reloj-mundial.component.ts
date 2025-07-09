import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface Timezone {
  name: string;
  timezone: string; // Ejemplo: 'America/New_York', 'Europe/London'
  time: string;
}

@Component({
  selector: 'app-reloj-mundial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-mundial.component.html',
  styleUrls: ['./reloj-mundial.component.css']
})
export class RelojMundialComponent implements OnInit, OnDestroy {
  timezones: Timezone[] = [
    { name: 'Nueva York', timezone: 'America/New_York', time: '' },
    { name: 'Londres', timezone: 'Europe/London', time: '' },
    { name: 'Tokio', timezone: 'Asia/Tokyo', time: '' },
    { name: 'Sídney', timezone: 'Australia/Sydney', time: '' },
    { name: 'Caracas', timezone: 'America/Caracas', time: '' } // Agregado por contexto
  ];
  private subscription!: Subscription;

  ngOnInit(): void {
    this.updateTimes();
    this.subscription = interval(1000).subscribe(() => {
      this.updateTimes();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateTimes(): void {
    this.timezones.forEach(tz => {
      const now = new Date();
      tz.time = now.toLocaleTimeString('es-VE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: tz.timezone,
        hour12: false // Formato 24 horas
      });
    });
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-cronometro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit, OnDestroy {
  milliseconds: number = 0;
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  isRunning: boolean = false;
  private timerSubscription: Subscription | undefined;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timerSubscription = interval(10).subscribe(() => { // Update every 10ms for milliseconds precision
        this.milliseconds += 10;
        if (this.milliseconds >= 1000) {
          this.milliseconds = 0;
          this.seconds++;
        }
        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes++;
        }
        if (this.minutes >= 60) {
          this.minutes = 0;
          this.hours++;
        }
      });
    }
  }

  stop(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
    this.isRunning = false;
  }

  reset(): void {
    this.stop();
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  formatTime(value: number, length: number = 2): string {
    return value.toString().padStart(length, '0');
  }
}
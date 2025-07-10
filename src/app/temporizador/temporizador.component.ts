import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-temporizador',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './temporizador.component.html',
  styleUrls: ['./temporizador.component.css']
})
export class TemporizadorComponent implements OnInit, OnDestroy {
  inputMinutes: number = 5; // Valor inicial para el input
  remainingSeconds: number = 0;
  remainingMinutes: number = 0;
  remainingHours: number = 0;

  private totalSeconds: number = 0;
  private timerSubscription: Subscription | undefined;
  isRunning: boolean = false;
  isFinished: boolean = false;

  ngOnInit(): void {
    this.setInitialTime();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  setInitialTime(): void {
    this.totalSeconds = this.inputMinutes * 60;
    this.updateDisplayTime();
    this.isFinished = false;
  }

  start(): void {
    if (!this.isRunning && this.totalSeconds > 0) {
      this.isRunning = true;
      this.isFinished = false;
      this.timerSubscription = interval(1000).subscribe(() => {
        this.totalSeconds--;
        this.updateDisplayTime();
        if (this.totalSeconds <= 0) {
          this.stop();
          this.isFinished = true;
        
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
    this.setInitialTime();
  }

  updateDisplayTime(): void {
    this.remainingHours = Math.floor(this.totalSeconds / 3600);
    this.remainingMinutes = Math.floor((this.totalSeconds % 3600) / 60);
    this.remainingSeconds = this.totalSeconds % 60;
  }

  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
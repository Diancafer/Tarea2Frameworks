import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common"; // Ya estaba importado

@Component({
  selector: 'app-reloj-binario',
  standalone: true, // <-- ¡Ya estaba configurado como Standalone!
  templateUrl: './reloj-binario.component.html',
  styleUrls: ['./reloj-binario.component.css'],
  imports: [CommonModule] // <-- ¡Ya estaba importando CommonModule!
})
export class RelojBinarioComponent implements OnInit {
  binaryHours: boolean[] = [];
  binaryMinutes: boolean[] = [];
  binarySeconds: boolean[] = [];
  currentHours: string = '';
  currentMinutes: string = '';
  currentSeconds: string = '';

  private baseTime: Date = new Date(); // Tiempo base desde el que se calcula el reloj

  ngOnInit(): void {
    this.updateBinaryTime();
    setInterval(() => this.incrementTime(), 1000);
  }

  // Convert a number to an array of booleans representing its binary form
  private toBinaryArray(num: number, bits: number): boolean[] {
    return Array.from({ length: bits }, (_, i) =>
      Boolean((num >> (bits - i - 1)) & 1)
    );
  }

  // Update binary arrays for hours, minutes, and seconds
  private updateBinaryTime(): void {
    const hours = this.baseTime.getHours();
    const minutes = this.baseTime.getMinutes();
    const seconds = this.baseTime.getSeconds();

    this.binaryHours = this.toBinaryArray(hours, 5); // 5 bits for hours
    this.binaryMinutes = this.toBinaryArray(minutes, 6); // 6 bits for minutes
    this.binarySeconds = this.toBinaryArray(seconds, 6); // 6 bits for seconds

    this.currentHours = hours.toString().padStart(2, '0');
    this.currentMinutes = minutes.toString().padStart(2, '0');
    this.currentSeconds = seconds.toString().padStart(2, '0');
  }

  // Increment time by one second
  private incrementTime(): void {
    this.baseTime.setSeconds(this.baseTime.getSeconds() + 1);
    this.updateBinaryTime();
  }

  // Adjust the time manually
  adjustTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);

    // Update baseTime to reflect the adjusted time
    this.baseTime.setHours(hours, minutes, 0);

    // Update the displayed binary time
    this.updateBinaryTime();
  }
}
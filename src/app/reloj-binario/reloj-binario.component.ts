import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common"; 

@Component({
  selector: 'app-reloj-binario',
  standalone: true, 
  templateUrl: './reloj-binario.component.html',
  styleUrls: ['./reloj-binario.component.css'],
  imports: [CommonModule] 
})
export class RelojBinarioComponent implements OnInit {
  binaryHours: boolean[] = [];
  binaryMinutes: boolean[] = [];
  binarySeconds: boolean[] = [];
  currentHours: string = '';
  currentMinutes: string = '';
  currentSeconds: string = '';

  private baseTime: Date = new Date();

  ngOnInit(): void {
    this.updateBinaryTime();
    setInterval(() => this.incrementTime(), 1000);
  }

  
  private toBinaryArray(num: number, bits: number): boolean[] {
    return Array.from({ length: bits }, (_, i) =>
      Boolean((num >> (bits - i - 1)) & 1)
    );
  }

  
  private updateBinaryTime(): void {
    const hours = this.baseTime.getHours();
    const minutes = this.baseTime.getMinutes();
    const seconds = this.baseTime.getSeconds();

    this.binaryHours = this.toBinaryArray(hours, 5); 
    this.binaryMinutes = this.toBinaryArray(minutes, 6); 
    this.binarySeconds = this.toBinaryArray(seconds, 6); 

    this.currentHours = hours.toString().padStart(2, '0');
    this.currentMinutes = minutes.toString().padStart(2, '0');
    this.currentSeconds = seconds.toString().padStart(2, '0');
  }


  private incrementTime(): void {
    this.baseTime.setSeconds(this.baseTime.getSeconds() + 1);
    this.updateBinaryTime();
  }

 
  adjustTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);

    this.baseTime.setHours(hours, minutes, 0);

  
    this.updateBinaryTime();
  }
}
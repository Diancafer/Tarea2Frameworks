import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reloj-fibonacci',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reloj-fibonacci.component.html',
  styleUrls: ['./reloj-fibonacci.component.css']
})
export class RelojFibonacciComponent implements OnInit {
  fibBlocks: { value: number, color: string }[] = [
    { value: 1, color: 'white' },
    { value: 1, color: 'white' },
    { value: 2, color: 'white' },
    { value: 3, color: 'white' },
    { value: 5, color: 'white' }
  ];
  displayTime: string = '';

  ngOnInit(): void {
    this.updateFibonacciClock();
    setInterval(() => this.updateFibonacciClock(), 1000);
  }

  private updateFibonacciClock(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Convertir horas a formato 12h
    let currentHours = hours % 12;
    if (currentHours === 0) currentHours = 12; // 00:xx o 12:xx se muestran como 12

    // Minutos se redondean a múltiplos de 5
    const currentMinutes = Math.floor(minutes / 5); // 0-11, representa 0, 5, ..., 55 minutos

    // Reiniciar colores
    this.fibBlocks.forEach(block => block.color = 'white');

    // Función auxiliar para colorear bloques
    const colorBlocks = (value: number, blockColor: string) => {
      let remaining = value;
      for (let i = this.fibBlocks.length - 1; i >= 0; i--) {
        if (this.fibBlocks[i].value <= remaining) {
          this.fibBlocks[i].color = blockColor;
          remaining -= this.fibBlocks[i].value;
        }
      }
    };

    // Colorear bloques para horas (rojo)
    colorBlocks(currentHours, 'red');

    // Colorear bloques para minutos (verde) - Asegúrate de no sobrescribir sin combinaciones
    // Para combinar colores: si un bloque ya es rojo, y también debe ser verde, se vuelve azul.
    const blocksToColorMinutes: number[] = [];
    let remainingMinutes = currentMinutes;
    for (let i = this.fibBlocks.length - 1; i >= 0; i--) {
        if (this.fibBlocks[i].value <= remainingMinutes) {
            blocksToColorMinutes.push(i);
            remainingMinutes -= this.fibBlocks[i].value;
        }
    }
    blocksToColorMinutes.forEach(index => {
        if (this.fibBlocks[index].color === 'red') {
            this.fibBlocks[index].color = 'blue'; // Rojo + Verde = Azul
        } else {
            this.fibBlocks[index].color = 'green';
        }
    });

    // Actualizar la hora digital para referencia
    this.displayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  }


  adjustTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
        const adjustedDate = new Date();
        adjustedDate.setHours(hours, minutes, 0);
        this.updateFibonacciClockWithDate(adjustedDate);
    }
  }

  private updateFibonacciClockWithDate(date: Date): void {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let currentHours = hours % 12;
    if (currentHours === 0) currentHours = 12;

    const currentMinutes = Math.floor(minutes / 5);

    this.fibBlocks.forEach(block => block.color = 'white');

    const colorBlocks = (value: number, blockColor: string) => {
      let remaining = value;
      for (let i = this.fibBlocks.length - 1; i >= 0; i--) {
        if (this.fibBlocks[i].value <= remaining) {
          if (this.fibBlocks[i].color === 'red' && blockColor === 'green') {
              this.fibBlocks[i].color = 'blue';
          } else if (this.fibBlocks[i].color === 'green' && blockColor === 'red') {
              this.fibBlocks[i].color = 'blue';
          } else {
              this.fibBlocks[i].color = blockColor;
          }
          remaining -= this.fibBlocks[i].value;
        }
      }
    };

    // Colorear bloques para horas (rojo)
    colorBlocks(currentHours, 'red');

    // Colorear bloques para minutos (verde)
    const blocksToColorMinutes: number[] = [];
    let remainingMinutes = currentMinutes;
    for (let i = this.fibBlocks.length - 1; i >= 0; i--) {
        if (this.fibBlocks[i].value <= remainingMinutes) {
            blocksToColorMinutes.push(i);
            remainingMinutes -= this.fibBlocks[i].value;
        }
    }
    blocksToColorMinutes.forEach(index => {
        if (this.fibBlocks[index].color === 'red') {
            this.fibBlocks[index].color = 'blue';
        } else {
            this.fibBlocks[index].color = 'green';
        }
    });

    this.displayTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }
}
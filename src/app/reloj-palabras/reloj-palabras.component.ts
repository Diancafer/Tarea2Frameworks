import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-reloj-palabras',
  standalone: true, 
  templateUrl: './reloj-palabras.component.html',
  styleUrls: ['./reloj-palabras.component.css'],
  imports: [CommonModule] 
})
export class RelojPalabrasComponent implements OnInit {
  timeInWords: string = '';
  currentDate: Date = new Date();

  ngOnInit(): void {
    this.updateTimeInWords();
    setInterval(() => {
      this.currentDate = new Date(this.currentDate.getTime() + 60000); // Incrementa por 1 minuto
      this.updateTimeInWords();
    }, 60000); // Actualiza cada minuto
  }

  /**
   * Ajusta la hora del reloj de palabras manualmente.
   * @param event El evento de cambio del input de tipo 'time'.
   */
  adjustTime(event: Event): void {
    const input = event.target as HTMLInputElement;
    const [hours, minutes] = input.value.split(':').map(Number);
    
    if (!isNaN(hours) && !isNaN(minutes)) {
      const now = new Date(); // Crea una nueva fecha para evitar modificar la fecha actual del sistema
      now.setHours(hours);
      now.setMinutes(minutes);
      now.setSeconds(0); // Reinicia los segundos a 0 al ajustar
      this.currentDate = now; // Actualiza la fecha interna del componente
      this.updateTimeInWords(); // Actualiza la visualización
    }
  }

  /**
   * Convierte la hora actual (interna) a su representación en palabras.
   */
  private updateTimeInWords(): void {
    const hours = this.currentDate.getHours();
    const minutes = this.currentDate.getMinutes();
    this.timeInWords = this.convertTimeToWords(hours, minutes);
  }

  /**
   * Lógica para convertir horas y minutos a palabras en español.
   * @param hours Horas (0-23).
   * @param minutes Minutos (0-59).
   * @returns La hora en formato de texto.
   */
  private convertTimeToWords(hours: number, minutes: number): string {
    const hourNames = [
      'doce', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
      'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'una' // 'doce' para 00:xx y 12:xx, 'una' para 13:xx
    ];

    // Determina la hora a mostrar (la siguiente hora si los minutos son > 30)
    let displayHour = hours % 12;
    if (displayHour === 0) displayHour = 12; // Para 00:xx y 12:xx, se dice 'doce'

    let minutePhrase: string;
    let article = 'las'; // Por defecto "las"

    if (minutes === 0) {
      minutePhrase = 'en punto';
    } else if (minutes <= 30) {
      minutePhrase = `y ${this.getMinuteWords(minutes)}`;
    } else { // minutes > 30, se dice "menos" la siguiente hora
      displayHour = (displayHour % 12) + 1; // Avanza a la siguiente hora
      if (displayHour === 1) article = 'la'; // Si es "la una"
      minutePhrase = `menos ${this.getMinuteWords(60 - minutes)}`;
    }

    if (displayHour === 1) article = 'la'; // Para "la una" (en punto, y X)

    return `Son ${article} ${hourNames[displayHour]} ${minutePhrase}`;
  }

  /**
   * Obtiene la palabra para los minutos específicos.
   * @param minutes Los minutos a convertir.
   * @returns La representación en palabras de los minutos.
   */
  private getMinuteWords(minutes: number): string {
    if (minutes === 15) return 'cuarto';
    if (minutes === 30) return 'media';
    return this.numberToWords(minutes);
  }

  /**
   * Convierte un número a su representación en palabras (hasta 30).
   * @param num El número a convertir.
   * @returns La palabra correspondiente al número.
   */
  private numberToWords(num: number): string {
    const numWords = [
      '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
      'siete', 'ocho', 'nueve', 'diez', 'once', 'doce',
      'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete',
      'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós',
      'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis',
      'veintisiete', 'veintiocho', 'veintinueve', 'treinta'
    ];
    return numWords[num];
  }
}
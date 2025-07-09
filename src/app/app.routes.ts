import { Routes } from '@angular/router';

import { RelojDigitalComponent } from './reloj-digital/reloj-digital.component';
import { RelojAnalogicoComponent } from './reloj-analogico/reloj-analogico.component';
import { RelojBinarioComponent } from './reloj-binario/reloj-binario.component';
import { RelojHexadecimalComponent } from './reloj-hexadecimal/reloj-hexadecimal.component';
import { RelojPalabrasComponent } from './reloj-palabras/reloj-palabras.component';
import { RelojMundialComponent } from './reloj-mundial/reloj-mundial.component';
import { CronometroComponent } from './cronometro/cronometro.component';
import { TemporizadorComponent } from './temporizador/temporizador.component';
import { RelojColorComponent } from './reloj-color/reloj-color.component';
import { RelojFibonacciComponent } from './reloj-fibonacci/reloj-fibonacci.component';
import { LoginComponent } from './login/login.component';
import { MenuRelojesComponent } from './menu-relojes/menu-relojes.component';
import { RegisterComponent } from './register/register.component'; 
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
 
  { path: 'register', component: RegisterComponent },

  {
    path: 'menu', 
    component: MenuRelojesComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: '', redirectTo: 'digital', pathMatch: 'full' }, 
      { path: 'digital', component: RelojDigitalComponent },
      { path: 'analogico', component: RelojAnalogicoComponent },
      { path: 'binario', component: RelojBinarioComponent },
      { path: 'hexadecimal', component: RelojHexadecimalComponent },
      { path: 'palabras', component: RelojPalabrasComponent },
      { path: 'mundial', component: RelojMundialComponent },
      { path: 'cronometro', component: CronometroComponent },
      { path: 'temporizador', component: TemporizadorComponent },
      { path: 'color', component: RelojColorComponent },
      { path: 'fibonacci', component: RelojFibonacciComponent },
    ],
  },
 
  { path: '**', redirectTo: '/login' },
];
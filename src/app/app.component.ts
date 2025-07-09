import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; 


import { LoginComponent } from './login/login.component';
import { MenuRelojesComponent } from './menu-relojes/menu-relojes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    LoginComponent, 
    MenuRelojesComponent 
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'time-viewer-angular';
}
import { Component, inject } from '@angular/core';
import { HeaderService } from './core/services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pedir-comida';
  
}

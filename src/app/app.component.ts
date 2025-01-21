import { Component } from '@angular/core';
import { WeatherLayoutComponent } from './components/weather-layout/weather-layout.component';

@Component({
  selector: 'app-root',
  imports: [WeatherLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weather';
}

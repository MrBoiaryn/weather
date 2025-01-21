import { Component } from '@angular/core';
import { WeatherDataService } from '../../shared/services/weather-data.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-weather-now-info',
  imports: [CommonModule, MatIcon],
  templateUrl: './weather-now-info.component.html',
  styleUrl: './weather-now-info.component.scss',
})
export class WeatherNowInfoComponent {
  constructor(private weatherDataService: WeatherDataService) {}

  currentFeelsLike = 0;
  currentWindSpeed = 0;
  currentWindDirection = '';
  currentHumidity = 0;
  currentUvi = 0;
  currentUviDescription = '';
  currentVisibility = 0;
  currentPressure = 0;

  ngOnInit() {
    this.getWeatherData();
  }

  getWeatherData() {
    this.weatherDataService.getWeatherData().subscribe((data) => {
      if (data) {
        this.currentFeelsLike = data.current.feels_like;
        this.currentWindSpeed = data.current.wind_speed;
        this.currentWindDirection = this.getWindDirection(
          data.current.wind_deg
        );
        this.currentHumidity = data.current.humidity;
        this.currentUvi = data.current.uvi;
        this.currentUviDescription = this.getUviDescription(data.current.uvi);
        this.currentVisibility = data.current.visibility / 1000;
        this.currentPressure = data.current.pressure;
      }
    });
  }

  getWindDirection(deg: number): string {
    if (deg >= 337.5 || deg < 22.5) return 'North';
    if (deg >= 22.5 && deg < 67.5) return 'North East';
    if (deg >= 67.5 && deg < 112.5) return 'East';
    if (deg >= 112.5 && deg < 157.5) return 'South East';
    if (deg >= 157.5 && deg < 202.5) return 'South';
    if (deg >= 202.5 && deg < 247.5) return 'South West';
    if (deg >= 247.5 && deg < 292.5) return 'West';
    if (deg >= 292.5 && deg < 337.5) return 'North West';
    return 'Unknown';
  }

  getUviDescription(uvi: number): string {
    if (uvi < 3) return 'Low';
    if (uvi >= 3 && uvi < 6) return 'Moderate';
    if (uvi >= 6 && uvi < 8) return 'High';
    if (uvi >= 8 && uvi < 11) return 'Very High';
    if (uvi >= 11) return 'Extreme';
    return 'Unknown';
  }
}

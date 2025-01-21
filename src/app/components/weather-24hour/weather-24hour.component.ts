import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WeatherDataService } from '../../shared/services/weather-data.service';

@Component({
  selector: 'app-weather-24hour',
  imports: [CommonModule],
  templateUrl: './weather-24hour.component.html',
  styleUrl: './weather-24hour.component.scss',
})
export class Weather24hourComponent {
  constructor(private weatherDataService: WeatherDataService) {}

  ngOnInit() {
    this.getWeatherData();
  }
  hourlyData: any[] = [];

  getWeatherData() {
    this.weatherDataService.getWeatherData().subscribe((data) => {
      if (data) {
        this.hourlyData = data.hourly
          .slice(0, 24)
          .map((hour: { dt: number; temp: any; weather: any[] }) => ({
            date: new Date(hour.dt * 1000).toISOString(),
            temp: hour.temp,
            icon: hour.weather[0].icon,
            description: hour.weather[0].description,
          }));
      }
    });
  }
}

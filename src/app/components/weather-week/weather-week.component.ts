import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WeatherDataService } from '../../shared/services/weather-data.service';

@Component({
  selector: 'app-weather-week',
  imports: [CommonModule],
  templateUrl: './weather-week.component.html',
  styleUrl: './weather-week.component.scss',
})
export class WeatherWeekComponent {
  constructor(private weatherDataService: WeatherDataService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  weeklyData: any[] = [];

  getWeatherData() {
    this.weatherDataService.getWeatherData().subscribe((data) => {
      if (data) {
        this.weeklyData = data.daily.map((day: any) => ({
          date: new Date(day.dt * 1000),
          icon: day.weather[0].icon,
          description: day.weather[0].description,
          temp: {
            min: day.temp.min,
            max: day.temp.max,
          },
        }));
      }
    });
  }
}

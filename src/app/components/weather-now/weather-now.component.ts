import { Component, OnInit } from '@angular/core';
import { AppScrollAnimationDirective } from '../appScrollAnimation.directive';
import { CommonModule } from '@angular/common';
import { WeatherDataService } from '../../shared/services/weather-data.service';

@Component({
  selector: 'app-weather-now',
  imports: [AppScrollAnimationDirective, CommonModule],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.scss',
})
export class WeatherNowComponent implements OnInit {
  constructor(private weatherDataService: WeatherDataService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  currentTemp = '';
  currentWeatherDescription = '';
  currentDt = new Date();
  dailyTempMin = '';
  dailyTempMax = '';
  currenFeelsLike = '';

  getWeatherData() {
    this.weatherDataService.getWeatherData().subscribe((data) => {
      if (data) {
        this.currentDt = new Date(
          data.current.dt * 1000 + data.timezone_offset
        );
        this.currentTemp = data.current.temp;
        this.currenFeelsLike = data.current.feels_like;
        this.currentWeatherDescription = data.current.weather[0].description;
        this.dailyTempMin = data.daily[0].temp.min;
        this.dailyTempMax = data.daily[0].temp.max;
      }
    });
  }
}

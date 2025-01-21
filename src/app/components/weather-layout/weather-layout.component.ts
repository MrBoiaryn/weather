import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { WeatherDataService } from '../../shared/services/weather-data.service';
import { GeopositionComponent } from '../geoposition/geoposition.component';
import { WeatherNowComponent } from '../weather-now/weather-now.component';
import { Weather24hourComponent } from '../weather-24hour/weather-24hour.component';
import { WeatherWeekComponent } from '../weather-week/weather-week.component';
import { WeatherNowInfoComponent } from '../weather-now-info/weather-now-info.component';

@Component({
  selector: 'app-weather-layout',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    GeopositionComponent,
    WeatherNowComponent,
    Weather24hourComponent,
    WeatherWeekComponent,
    WeatherNowInfoComponent,
  ],
  templateUrl: './weather-layout.component.html',
  styleUrl: './weather-layout.component.scss',
})
export class WeatherLayoutComponent implements OnInit {
  constructor(private weatherDataService: WeatherDataService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  currentWindSpeed = '';
  hourlyTemp = ['', ''];
  currentWeatherMain!: string;
  urlBgImg = '';
  weeklyData: any[] = [];

  getWeatherData() {
    this.weatherDataService.getWeatherData().subscribe((data) => {
      if (data) {
        this.currentWeatherMain = data.current.weather[0].main;
        switch (this.currentWeatherMain) {
          case 'Thunderstorm':
            this.urlBgImg = 'Thunderstorm';
            break;
          case 'Drizzle':
            this.urlBgImg = 'Drizzle';
            break;
          case 'Rain':
            this.urlBgImg = 'Rain';
            break;
          case 'Snow':
            this.urlBgImg = 'Snow';
            break;
          case 'Clear':
            this.urlBgImg = 'Clear';
            break;
          case 'Clouds':
            this.urlBgImg = 'Clouds';
            break;
          default:
            this.urlBgImg = 'DefaultBackground';
            break;
        }
      }
    });
  }
}

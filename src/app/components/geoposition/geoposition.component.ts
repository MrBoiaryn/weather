import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WeatherDataService } from '../../shared/services/weather-data.service';

@Component({
  selector: 'app-geoposition',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './geoposition.component.html',
  styleUrl: './geoposition.component.scss',
})
export class GeopositionComponent {
  constructor(private weatherDataService: WeatherDataService) {}

  ngOnInit() {
    this.getWeatherData();
  }

  value = 'Kyiv';

  getWeatherData() {
    this.weatherDataService.getWeatherData().subscribe((data) => {
      if (data) {
        this.value = data.timezone;
      }
    });
  }
}

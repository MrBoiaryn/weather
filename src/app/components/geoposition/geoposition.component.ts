import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WeatherDataService } from '../../shared/services/weather-data.service';
import { GeolocationService } from '../../shared/services/geolocation.service';

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
  cityName: string | null = null;
  locationError: string | null = null;

  constructor(
    private weatherDataService: WeatherDataService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.geolocationService
      .getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Широта: ${latitude}, Довгота: ${longitude}`); // Додай цей рядок
        this.geolocationService.getCityName(latitude, longitude).then(
          (city) => {
            this.cityName = city;
            console.log('Ваш населений пункт:', city);
          },
          (error) => {
            this.locationError = 'Не вдалося отримати назву населеного пункту.';
            console.error(error);
          }
        );
      })
      .catch((error) => {
        this.locationError = 'Не вдалося отримати вашу геолокацію.';
        console.error(error);
      });
  }
}

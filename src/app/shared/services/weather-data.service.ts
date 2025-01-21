import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  latitude: number | null = null;
  longitude: number | null = null;
  locationError: string | null = null;

  private weatherSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private geolocationService: GeolocationService
  ) {
    this.getUserLocation();
    this.initWeatherData();
  }

  private get dataUrl() {
    if (this.latitude !== null && this.longitude !== null) {
      return `https://api.openweathermap.org/data/3.0/onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=minutely&units=metric&appid=79865a6793a2756b576dd1a1da440bc8`;
    }
    return '';
  }

  getWeatherData(): Observable<any> {
    return this.weatherSubject.asObservable();
  }

  getUserLocation() {
    this.geolocationService
      .getCurrentPosition()
      .then((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      })
      .catch((error) => {
        this.locationError = error;
      });
  }

  private async initWeatherData(): Promise<void> {
    try {
      const position = await this.geolocationService.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      console.log(`Координати отримані: ${this.latitude}, ${this.longitude}`);

      this.fetchWeatherData();
    } catch (error) {
      console.error('Помилка отримання геолокації:', error);
    }
  }

  private fetchWeatherData(): void {
    if (this.dataUrl) {
      this.http.get<any>(this.dataUrl).subscribe((data) => {
        this.weatherSubject.next(data);
      });
    }
  }
}

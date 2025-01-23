import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private reverseGeocodingUrl = 'http://api.openweathermap.org/geo/1.0/reverse';
  private apiKey = '79865a6793a2756b576dd1a1da440bc8';

  constructor(private http: HttpClient) {}

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Геолокація не підтримується вашим браузером.');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(this.getGeolocationErrorMessage(error)),
          { enableHighAccuracy: true, maximumAge: 0 } // Встанови точність
        );
      }
    });
  }

  getCityName(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then((response) => {
        console.log('API Response:', response); // Додай цей рядок
        if (response && response.address) {
          const city =
            response.address.city ||
            response.address.town ||
            response.address.village;
          console.log('Detected city:', city); // Додай цей рядок
          return city || 'Невідомий населений пункт';
        } else {
          throw new Error('Не вдалося знайти населений пункт.');
        }
      })
      .catch((error) => {
        console.error('Помилка зворотного геокодування:', error); // Додай цей рядок
        throw error;
      });
  }

  private getGeolocationErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'The user rejected the geolocation request.';
      case error.POSITION_UNAVAILABLE:
        return 'No location information available.';
      case error.TIMEOUT:
        return 'The geolocation request timed out.';
      default:
        return 'An unknown error occurred while receiving geolocation.';
    }
  }
}

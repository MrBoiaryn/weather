import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser.');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(this.getGeolocationErrorMessage(error))
        );
      }
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

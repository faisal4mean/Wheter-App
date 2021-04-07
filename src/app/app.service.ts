import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }


  getWhether(cityName: any): Observable<any> {
    return this.http.get<any[]>(`http://api.weatherapi.com/v1/current.json?key=20fe34f6546a4391bb2161548210504&q=${cityName}&aqi=no`)

  }

}



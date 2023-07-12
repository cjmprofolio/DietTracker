import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurantlist } from './diet.service'
import { httpOptions } from './diet.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiurl='http://127.0.0.1:8000/api/restaurant'
  private httpOptions= httpOptions

  constructor(private http:HttpClient) {};

  getAllRestaurants(): Observable<Restaurantlist[]> {
    return this.http.get<Restaurantlist[]>(this.apiurl, {headers: this.httpOptions.headers})
  };

  createRestaurant(data: any): Observable<any>{
    return this.http.post<any>(`${this.apiurl}/`, data, {headers: this.httpOptions.headers})
  };

  deleteRestaurant(id: number): Observable<any>{
    console.log(id)
    return this.http.delete(`${this.apiurl}/${id}/`, {headers: this.httpOptions.headers})
  };

}



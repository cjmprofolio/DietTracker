import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map } from 'rxjs';
import { Meallist } from './diet.service';
import { HttpParams } from "@angular/common/http";
import { DateService } from './date.service';
import { httpOptions } from './diet.service';


@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiurl= 'http://127.0.0.1:8000/api/meal';
  selected= new Date()

  private httpOptions= httpOptions
  // allmeals$= this.http.get<Meallist[]>(this.apiurl).pipe(
  //   shareReplay(1)
  // );
  
  constructor(private http: HttpClient, private _dateService: DateService) {};
  
  getSelectedMeal(date: Date): Observable<Meallist[]> {
    let str_date= this._dateService.dateChange(date)
    let params= new HttpParams().set('date',str_date);
    const options = { params: params, headers: this.httpOptions.headers};

    return this.http.get<Meallist[]>(this.apiurl, options).pipe(
      map((meals)=>{
        
        const mealOrder= ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Dessert', 'Midnight Snack']

        meals.sort((a, b)=>{
          let indexA= mealOrder.indexOf(a.meal)
          let indexB= mealOrder.indexOf(b.meal)
          return indexA - indexB
        })

        return meals
      }),
      catchError(error => {
        return of([error])
      })
    );
  };

  createMeal(data: any):Observable<any>{
    return this.http.post<any>(`${this.apiurl}/`, data, {headers: this.httpOptions.headers})
  };

  updateMeal(data: any, id:any):Observable<any>{
    return this.http.patch(`${this.apiurl}/${id}/`, data, {headers: this.httpOptions.headers})
  }

  deleteMeal(id:any):Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}/`, {headers: this.httpOptions.headers})
  }

}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions } from './diet.service';
import { Injectable } from '@angular/core';
import { Menulist } from '../Services/diet.service'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiurl='http://127.0.0.1:8000/api/menu'
  private httpOptions= httpOptions

  menus$= this.http.get<Menulist[]>(this.apiurl, {headers: this.httpOptions.headers} )

  constructor(private http: HttpClient) {}

  getMenus(): Observable<Menulist[]> {
    return this.menus$
  }

}

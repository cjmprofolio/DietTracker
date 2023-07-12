import { HttpHeaders } from '@angular/common/http';

export interface Meallist{
    id: number,
    food: Menulist[],
    name: string,
    date: Date,
    meal: string,
    created_date: Date,
    lastest_revised_date: Date,
}

export interface Menulist{
    id: number,
    food_name: string
    ingredients: string[],
    calorie: number,
    price: number,
    created_date: Date,
    lastest_revised_date: Date,
    restaurant: Restaurantlist,
}

export interface Restaurantlist {
    id: number,
    shop_name: string,
    location: string,
    created_date: Date,
    lastest_revised_date: Date,
}

export let Mealoptions=[
    {value: 'Breakfast'},
    {value: 'Brunch'},
    {value: 'Lunch'},
    {value: 'Dinner'},
    {value: 'Dessert'},
    {value: 'Midnight Snack'},
] as { value: string }[]

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('jiaming:jiaming')
    })
  }; 

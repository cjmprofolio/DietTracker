import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Meallist } from '../Services/diet.service';
import { MealService } from '../Services/meal.service';



@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('450ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class MealComponent{
  
  @Input() mealList: Meallist[]=[];
  @Input() date= new Date();

  expandedElement: Meallist | null= null;

  columnsToDisplayWithExpand= ["meal", "food_name", "price", "calorie", "expand"]

  constructor( private _mealService: MealService){};

  
  getSelectedMeal(date:Date) {
    this._mealService.getSelectedMeal(date).subscribe(meals =>{
      this.mealList= meals; 
    })
  };

  deleteMeal(id:any){
    this._mealService.deleteMeal(id).subscribe(_=>{
      this.getSelectedMeal(this.date);
    })
  };

  expandElement(element: Meallist | null) {
    if (this.expandedElement === element){
      this.expandedElement= null;
    } else {
      this.expandedElement= element;
    }
  };

}

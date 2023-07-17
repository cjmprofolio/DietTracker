import { Component, OnInit } from '@angular/core';
import { Meallist } from '../Services/diet.service';
import { MealService } from '../Services/meal.service';
import { DateService } from '../Services/date.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  mealList: Meallist[]= [];
  selectedDate: Date = new Date();

  constructor( private mealService: MealService, private dateService: DateService){};

  ngOnInit(): void {
    this.getDate();
  }

  // get selected meal record
  getSelectedMeal(date:Date) {
    this.mealService.getSelectedMeal(date).subscribe(meals =>{
      this.mealList= meals; 
    })
  };

  // get date from date service
  getDate(){
    this.dateService.currentDate.subscribe(date=>{
      this.selectedDate= date;
      this.getSelectedMeal(this.selectedDate)
    });
  };
}

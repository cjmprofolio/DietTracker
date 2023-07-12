import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'
import { RestaurantService } from '../Services/restaurant.service';
import { Meallist, Menulist, Restaurantlist, Mealoptions } from '../Services/diet.service';
import { MealService } from '../Services/meal.service';
import { DateService } from '../Services/date.service';
import { map } from 'rxjs'

// custom the ErrorStateMatcher for select and input in form
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}

@Component({
  selector: 'app-updatemealform',
  templateUrl: './updatemealform.component.html',
  styleUrls: ['./updatemealform.component.css']
})
export class UpdatemealformComponent implements OnInit ,OnChanges{

  // get date and meal element from parent
  @Input() date: Date= new Date();
  @Input() element: Meallist | null= null;
  hiddenControl: boolean= false;

  @Output() mealupdated= new EventEmitter();

  // create CustomErrorStateMatcher
  matcher= new CustomErrorStateMatcher()

  // get meal options
  mealOptions: { value: string }[]= Mealoptions
  
  allRests: Restaurantlist[]= [];
  
  mealform= this._fb.group({
    meal: ['',  [Validators.required]],
    food: this._fb.array([
      this.createFoodgroup()
    ]),
  });


  constructor(private _fb: FormBuilder, private _restService: RestaurantService, private _mealService: MealService,
    private _dateService: DateService){
  }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.element !== null) {
      this.getMealdetail(this.element);
      this.hiddenControl= true;
    }
  }

  get foodarray(){
    return this.mealform.get('food') as FormArray;
  };
  addFoodarr(iter: number=1){
    for (let i=0; i <iter; i++){
      this.foodarray.push(this.createFoodgroup());
    }
  };

  removeFoodarr(index: number= this.foodarray.length-1){
    this.foodarray.removeAt(index)
  };

  createFoodgroup(){
    let foodgroup= this._fb.group(
      {restaurant: ['', [Validators.required]],
        food_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        ingredients: ['',[Validators.required]],
        calorie: [1, [Validators.required, Validators.min(1)]],
        price: [1, [Validators.required, Validators.min(1)]],
    });
    return foodgroup
  };


  onSubmit(mealform:any){
    mealform['name']= 'test';
    mealform['date']= this._dateService.dateChange(this.date);
    // update meal record
    if (this.element) {
      this._mealService.updateMeal(mealform, this.element.id).subscribe(
        (form)=>{console.log(form)}
      );
    }
    // create new meal record
    else {
      this._mealService.createMeal(mealform).subscribe((form)=>
    {console.log(form)});
    // reset to default meal form
    this.mealform= this._fb.group({
      meal: ['',  [Validators.required]],
      food: this._fb.array([
        this.createFoodgroup()
      ]),
    });
    }
    this.mealupdated.emit()
  };

  getAllRestaurants(){
    this._restService.getAllRestaurants().pipe(
      map((rest)=>{
        this.allRests= rest;
        })
    ).subscribe()
  };

  getMealdetail(element: any){

    // set the meal
    this.mealform.get('meal')?.setValue(element.meal)

    let items= element.food as Menulist[];
    let len= items.length;
    // clear current formarray
    this.foodarray.clear()

    for (let i= 0; i < len; i++) {
      let item= items[i]
      let restaurantValue = { id: item.restaurant.id, shop_name: item.restaurant.shop_name, location: item.restaurant.location };
      // create new formarray and set value
      let newForm= this._fb.group({
        restaurant: restaurantValue,
        food_name: [item.food_name, [Validators.minLength(1), Validators.maxLength(30)]],
        ingredients: item.ingredients.toString(),
        calorie: [item.calorie, Validators.min(1)],
        price: [item.price, Validators.min(1)],
      });
      // push to formarray
      this.foodarray.push(newForm)
    }
  };

  // for select the object options in <mat-select>
  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

}

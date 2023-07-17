import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Restaurantlist } from '../Services/diet.service'
import { RestaurantService } from '../Services/restaurant.service'


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['place', 'location', 'expanded'];
  dataSource= new MatTableDataSource<Restaurantlist>();

  // init timeroutid
  timerID:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  restaurantForm= this.fb.group({
    place: ['', Validators.required],
    location: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private restService: RestaurantService,){}

  ngOnInit(): void {
    this.restService.getAllRestaurants().subscribe(
      {
        next: (restaurant) => {
          this.dataSource.data= restaurant
        }
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator
    this.dataSource.sort= this.sort
  }

  // add new restaurant and display new table
  addRestaurant(f:any){
    let s = Object.entries(f).reduce((ans, [key, value]) => {
      ans[key as keyof Restaurantlist] = (value as string).toLowerCase();
      return ans;
    }, {} as Record<keyof Restaurantlist, string | Date>);
    
    this.restService.createRestaurant(s).subscribe(() => {
      this.restService.getAllRestaurants().subscribe((restaurant) => {
        this.dataSource.data = restaurant;
      });
    });
    // resetform without validator alarms
    this.formRef.resetForm()
  }

  // delete the Restaurant and display new table
  deleteRestaurant(id: any){
    this.restService.deleteRestaurant(id).subscribe(() => {
      this.restService.getAllRestaurants().subscribe((restaurant) => {
        this.dataSource.data = restaurant;
      });
    })
  };


  // filter the display column
  applyFilter(event: Event) {
    // clear old timeoutID
    clearTimeout(this.timerID)
    // set new timeoutID
    this.timerID= setTimeout(()=>{
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, 500)
    
  }

}

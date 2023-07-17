import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../Services/menu.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Menulist } from '../Services/diet.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['food_name', 'ingredients', 'calorie', 'price', 'restaurant'];
  dataSource= new MatTableDataSource<Menulist>();

  // init timeroutid
  timerID:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private menuService: MenuService){};

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator
    this.dataSource.sort= this.sort
  }

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

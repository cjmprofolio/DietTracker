import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DateService } from './Services/date.service';
import { MealService } from './Services/meal.service';

import { CommonModule } from '@angular/common';
import { MealComponent } from './meal/meal.component';
import { UpdatemealformComponent } from './updatemealform/updatemealform.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RestaurantService } from './Services/restaurant.service';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';

const approuter: Routes= [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'restaurant', component: RestaurantComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    MealComponent,
    UpdatemealformComponent,
    RestaurantComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      approuter
    ),
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [DateService, MealService, RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }

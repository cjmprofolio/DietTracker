import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateService } from '../Services/date.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements AfterViewInit{
    @ViewChild('datepicker') datepicker!: MatCalendar<Date>;
    selected: Date= new Date();
    

    constructor( private dateservice: DateService, private cd: ChangeDetectorRef){
      this.selected.setHours(0,0,0,0);
      this.dateservice.currentDate.subscribe((date)=>{
        this.selected= date
        if (this.datepicker) {
          this.datepicker.activeDate = date;
        }
      })
    }

    ngAfterViewInit(): void {
      if (this.datepicker) {
        this.datepicker.activeDate = this.selected;
        this.datepicker.updateTodaysDate();
      }
      // detect change after viewinit
      this.cd.detectChanges()
    }

    dateSelected(date: Date): void {
      this.selected = date;
      // push new date to dateservice
      this.dateservice.setSelectedDate(date);
    }

    dateReset() {
      this.selected= new Date();
      this.selected.setHours(0,0,0,0);
      // push new date to dateservice
      this.dateservice.setSelectedDate(this.selected);
    };
}

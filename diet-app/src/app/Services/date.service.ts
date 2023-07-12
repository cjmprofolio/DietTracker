import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DateService {
    private selectedDate = new BehaviorSubject<Date>(new Date());
    
    currentDate = this.selectedDate.asObservable();

    constructor() { }

    // update the new date
    setSelectedDate(date: Date) {
        this.selectedDate.next(date);
      }
      
    dateChange(date: Date) {
      const year= date.getFullYear().toString();
      // if digit < 10, padded with 0
      const mon= date.getMonth()+1 < 10 ?  '0' + (date.getMonth()+1).toString() : (date.getMonth()+1).toString()// for zero-based month to one-baed month
      const day= date.getDate() < 10 ?  '0' + (date.getDate()).toString() : (date.getDate()).toString()
      
      return `${year}-${mon}-${day}`
    };
}
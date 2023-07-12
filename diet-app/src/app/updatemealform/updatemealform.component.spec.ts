import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemealformComponent } from './updatemealform.component';

describe('UpdatemealformComponent', () => {
  let component: UpdatemealformComponent;
  let fixture: ComponentFixture<UpdatemealformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatemealformComponent]
    });
    fixture = TestBed.createComponent(UpdatemealformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

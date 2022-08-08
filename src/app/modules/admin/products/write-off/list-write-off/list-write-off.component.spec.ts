import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWriteOffComponent } from './list-write-off.component';

describe('ListWriteOffComponent', () => {
  let component: ListWriteOffComponent;
  let fixture: ComponentFixture<ListWriteOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWriteOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWriteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

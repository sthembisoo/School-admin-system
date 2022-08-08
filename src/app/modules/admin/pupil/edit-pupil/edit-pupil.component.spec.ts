/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditPupilComponent } from './edit-pupil.component';

describe('EditPupilComponent', () => {
  let component: EditPupilComponent;
  let fixture: ComponentFixture<EditPupilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPupilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

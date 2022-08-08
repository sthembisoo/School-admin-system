/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaffEventsService } from './staff-events.service';

describe('Service: StaffEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffEventsService]
    });
  });

  it('should ...', inject([StaffEventsService], (service: StaffEventsService) => {
    expect(service).toBeTruthy();
  }));
});

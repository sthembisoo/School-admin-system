/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfirmationUtilService } from './confirmationUtil.service';

describe('Service: ConfirmationUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationUtilService]
    });
  });

  it('should ...', inject([ConfirmationUtilService], (service: ConfirmationUtilService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { TiketService } from './tiket.service';

describe('TiketService', () => {
  let service: TiketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

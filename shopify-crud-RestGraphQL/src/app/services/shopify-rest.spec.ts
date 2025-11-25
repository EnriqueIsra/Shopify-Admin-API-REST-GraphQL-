import { TestBed } from '@angular/core/testing';

import { ShopifyRest } from './shopify-rest';

describe('ShopifyRest', () => {
  let service: ShopifyRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopifyRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

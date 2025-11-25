import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestProducts } from './rest-products';

describe('RestProducts', () => {
  let component: RestProducts;
  let fixture: ComponentFixture<RestProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

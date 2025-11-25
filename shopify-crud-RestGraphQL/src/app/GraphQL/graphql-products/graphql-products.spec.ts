import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlProducts } from './graphql-products';

describe('GraphqlProducts', () => {
  let component: GraphqlProducts;
  let fixture: ComponentFixture<GraphqlProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphqlProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphqlProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlProductEdit } from './graphql-product-edit';

describe('GraphqlProductEdit', () => {
  let component: GraphqlProductEdit;
  let fixture: ComponentFixture<GraphqlProductEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphqlProductEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphqlProductEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlProductCreate } from './graphql-product-create';

describe('GraphqlProductCreate', () => {
  let component: GraphqlProductCreate;
  let fixture: ComponentFixture<GraphqlProductCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphqlProductCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphqlProductCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

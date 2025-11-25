import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestProductEdit } from './rest-product-edit';

describe('RestProductEdit', () => {
  let component: RestProductEdit;
  let fixture: ComponentFixture<RestProductEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestProductEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestProductEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

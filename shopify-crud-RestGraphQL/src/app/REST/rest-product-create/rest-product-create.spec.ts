import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestProductCreate } from './rest-product-create';

describe('RestProductCreate', () => {
  let component: RestProductCreate;
  let fixture: ComponentFixture<RestProductCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestProductCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestProductCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

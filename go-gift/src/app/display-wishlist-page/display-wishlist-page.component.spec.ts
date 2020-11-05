import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWishlistPageComponent } from './display-wishlist-page.component';

describe('DisplayWishlistPageComponent', () => {
  let component: DisplayWishlistPageComponent;
  let fixture: ComponentFixture<DisplayWishlistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayWishlistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWishlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

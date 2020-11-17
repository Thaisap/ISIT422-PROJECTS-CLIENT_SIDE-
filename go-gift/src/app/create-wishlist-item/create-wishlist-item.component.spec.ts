import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWishlistItemComponent } from './create-wishlist-item.component';

describe('CreateWishlistItemComponent', () => {
  let component: CreateWishlistItemComponent;
  let fixture: ComponentFixture<CreateWishlistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWishlistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWishlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

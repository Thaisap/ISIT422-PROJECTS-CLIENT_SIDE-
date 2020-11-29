import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendWishlistComponent } from './friend-wishlist.component';

describe('FriendWishlistComponent', () => {
  let component: FriendWishlistComponent;
  let fixture: ComponentFixture<FriendWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

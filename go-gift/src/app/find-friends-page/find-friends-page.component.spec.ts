import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFriendsPageComponent } from './find-friends-page.component';

describe('FindFriendsPage', () => {
  let component: FindFriendsPageComponent;
  let fixture: ComponentFixture<FindFriendsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindFriendsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

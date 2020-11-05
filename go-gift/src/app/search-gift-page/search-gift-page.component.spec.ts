import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGiftPageComponent } from './search-gift-page.component';

describe('SearchGiftPageComponent', () => {
  let component: SearchGiftPageComponent;
  let fixture: ComponentFixture<SearchGiftPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGiftPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGiftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

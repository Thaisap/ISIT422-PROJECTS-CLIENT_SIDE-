import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovableChipComponent } from './removable-chip.component';

describe('RemovableChipComponent', () => {
  let component: RemovableChipComponent;
  let fixture: ComponentFixture<RemovableChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovableChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovableChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

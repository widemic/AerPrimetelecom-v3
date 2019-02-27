import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanouComponent } from './panou.component';

describe('PanouComponent', () => {
  let component: PanouComponent;
  let fixture: ComponentFixture<PanouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

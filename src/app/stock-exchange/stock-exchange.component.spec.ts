import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stock-exchange.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

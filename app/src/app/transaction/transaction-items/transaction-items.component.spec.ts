import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionItemsComponent } from './transaction-items.component';

describe('TransactionItemsComponent', () => {
  let component: TransactionItemsComponent;
  let fixture: ComponentFixture<TransactionItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

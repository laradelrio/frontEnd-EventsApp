import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofillAddressComponent } from './autofill-address.component';

describe('AutofillAddressComponent', () => {
  let component: AutofillAddressComponent;
  let fixture: ComponentFixture<AutofillAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutofillAddressComponent]
    });
    fixture = TestBed.createComponent(AutofillAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

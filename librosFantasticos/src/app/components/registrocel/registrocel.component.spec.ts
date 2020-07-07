import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrocelComponent } from './registrocel.component';

describe('RegistrocelComponent', () => {
  let component: RegistrocelComponent;
  let fixture: ComponentFixture<RegistrocelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrocelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrocelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

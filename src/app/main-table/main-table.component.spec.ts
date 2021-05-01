import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MainTableComponent } from './main-table.component';

describe('MainTableComponent', () => {
  let component: MainTableComponent;
  let fixture: ComponentFixture<MainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      declarations: [ MainTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add 15 to index 0 limits', () => {
    component.addLimitWithoutCompesation(0)
    expect(component.limits).toEqual([30, 15, 15]);
  });

  it('should have default producer in all selects', () => {
    let value = component.producer1Control.value == ''
                && component.producer2Control.value == ''
                && component.producer3Control.value == ''
    expect(value).toBeTrue();
  })
});

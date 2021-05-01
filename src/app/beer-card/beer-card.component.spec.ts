import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { BeerCardComponent } from './beer-card.component';

describe('BeerCardComponent', () => {
  let component: BeerCardComponent;
  let fixture: ComponentFixture<BeerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ BeerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerCardComponent);
    component = fixture.componentInstance;

    component.beer = {"name":"Fix Sana", "type":"net", "price_per_litre":73.89, "thumbnail_url":"http://dummyimage.com/100x100.png/dddddd/000000", "brewer":"InnoZ"}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain loaded data', () => {
    expect(component.beer).toEqual({"name":"Fix Sana", "type":"net", "price_per_litre":73.89, "thumbnail_url":"http://dummyimage.com/100x100.png/dddddd/000000", "brewer":"InnoZ"});
  });
});

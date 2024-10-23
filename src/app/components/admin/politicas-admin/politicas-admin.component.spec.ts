import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasAdminComponent } from './politicas-admin.component';

describe('PoliticasAdminComponent', () => {
  let component: PoliticasAdminComponent;
  let fixture: ComponentFixture<PoliticasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

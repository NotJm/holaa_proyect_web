import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasAdminComponent } from './incidencias-admin.component';

describe('IncidenciasAdminComponent', () => {
  let component: IncidenciasAdminComponent;
  let fixture: ComponentFixture<IncidenciasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidenciasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenciasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

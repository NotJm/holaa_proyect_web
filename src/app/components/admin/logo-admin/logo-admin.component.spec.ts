import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAdminComponent } from './logo-admin.component';

describe('LogoAdminComponent', () => {
  let component: LogoAdminComponent;
  let fixture: ComponentFixture<LogoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

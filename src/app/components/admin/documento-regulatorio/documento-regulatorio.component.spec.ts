import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoRegulatorioComponent } from './documento-regulatorio.component';

describe('DocumentoRegulatorioComponent', () => {
  let component: DocumentoRegulatorioComponent;
  let fixture: ComponentFixture<DocumentoRegulatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoRegulatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoRegulatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

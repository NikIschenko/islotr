/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IslotrTestModule } from '../../../test.module';
import { LanguageLotrDetailComponent } from 'app/entities/language-lotr/language-lotr-detail.component';
import { LanguageLotr } from 'app/shared/model/language-lotr.model';

describe('Component Tests', () => {
  describe('LanguageLotr Management Detail Component', () => {
    let comp: LanguageLotrDetailComponent;
    let fixture: ComponentFixture<LanguageLotrDetailComponent>;
    const route = ({ data: of({ language: new LanguageLotr(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [LanguageLotrDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LanguageLotrDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LanguageLotrDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.language).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

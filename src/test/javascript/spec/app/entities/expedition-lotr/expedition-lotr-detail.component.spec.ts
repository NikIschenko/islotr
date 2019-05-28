/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IslotrTestModule } from '../../../test.module';
import { ExpeditionLotrDetailComponent } from 'app/entities/expedition-lotr/expedition-lotr-detail.component';
import { ExpeditionLotr } from 'app/shared/model/expedition-lotr.model';

describe('Component Tests', () => {
  describe('ExpeditionLotr Management Detail Component', () => {
    let comp: ExpeditionLotrDetailComponent;
    let fixture: ComponentFixture<ExpeditionLotrDetailComponent>;
    const route = ({ data: of({ expedition: new ExpeditionLotr(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ExpeditionLotrDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExpeditionLotrDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpeditionLotrDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.expedition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

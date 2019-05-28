/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IslotrTestModule } from '../../../test.module';
import { ExpeditionLotrComponent } from 'app/entities/expedition-lotr/expedition-lotr.component';
import { ExpeditionLotrService } from 'app/entities/expedition-lotr/expedition-lotr.service';
import { ExpeditionLotr } from 'app/shared/model/expedition-lotr.model';

describe('Component Tests', () => {
  describe('ExpeditionLotr Management Component', () => {
    let comp: ExpeditionLotrComponent;
    let fixture: ComponentFixture<ExpeditionLotrComponent>;
    let service: ExpeditionLotrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ExpeditionLotrComponent],
        providers: []
      })
        .overrideTemplate(ExpeditionLotrComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExpeditionLotrComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpeditionLotrService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExpeditionLotr(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.expeditions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

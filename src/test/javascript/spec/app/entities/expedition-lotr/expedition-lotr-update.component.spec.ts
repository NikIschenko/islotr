/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IslotrTestModule } from '../../../test.module';
import { ExpeditionLotrUpdateComponent } from 'app/entities/expedition-lotr/expedition-lotr-update.component';
import { ExpeditionLotrService } from 'app/entities/expedition-lotr/expedition-lotr.service';
import { ExpeditionLotr } from 'app/shared/model/expedition-lotr.model';

describe('Component Tests', () => {
  describe('ExpeditionLotr Management Update Component', () => {
    let comp: ExpeditionLotrUpdateComponent;
    let fixture: ComponentFixture<ExpeditionLotrUpdateComponent>;
    let service: ExpeditionLotrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ExpeditionLotrUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExpeditionLotrUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExpeditionLotrUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpeditionLotrService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExpeditionLotr(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExpeditionLotr();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

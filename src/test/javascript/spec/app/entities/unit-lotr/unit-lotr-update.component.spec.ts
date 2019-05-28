/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IslotrTestModule } from '../../../test.module';
import { UnitLotrUpdateComponent } from 'app/entities/unit-lotr/unit-lotr-update.component';
import { UnitLotrService } from 'app/entities/unit-lotr/unit-lotr.service';
import { UnitLotr } from 'app/shared/model/unit-lotr.model';

describe('Component Tests', () => {
  describe('UnitLotr Management Update Component', () => {
    let comp: UnitLotrUpdateComponent;
    let fixture: ComponentFixture<UnitLotrUpdateComponent>;
    let service: UnitLotrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [UnitLotrUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UnitLotrUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnitLotrUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitLotrService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UnitLotr(123);
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
        const entity = new UnitLotr();
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

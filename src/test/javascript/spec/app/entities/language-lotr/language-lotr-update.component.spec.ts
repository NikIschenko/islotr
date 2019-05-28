/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IslotrTestModule } from '../../../test.module';
import { LanguageLotrUpdateComponent } from 'app/entities/language-lotr/language-lotr-update.component';
import { LanguageLotrService } from 'app/entities/language-lotr/language-lotr.service';
import { LanguageLotr } from 'app/shared/model/language-lotr.model';

describe('Component Tests', () => {
  describe('LanguageLotr Management Update Component', () => {
    let comp: LanguageLotrUpdateComponent;
    let fixture: ComponentFixture<LanguageLotrUpdateComponent>;
    let service: LanguageLotrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [LanguageLotrUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LanguageLotrUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LanguageLotrUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LanguageLotrService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LanguageLotr(123);
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
        const entity = new LanguageLotr();
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

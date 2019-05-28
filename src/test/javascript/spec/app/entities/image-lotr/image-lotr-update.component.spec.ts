/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IslotrTestModule } from '../../../test.module';
import { ImageLotrUpdateComponent } from 'app/entities/image-lotr/image-lotr-update.component';
import { ImageLotrService } from 'app/entities/image-lotr/image-lotr.service';
import { ImageLotr } from 'app/shared/model/image-lotr.model';

describe('Component Tests', () => {
  describe('ImageLotr Management Update Component', () => {
    let comp: ImageLotrUpdateComponent;
    let fixture: ComponentFixture<ImageLotrUpdateComponent>;
    let service: ImageLotrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ImageLotrUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ImageLotrUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImageLotrUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageLotrService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ImageLotr(123);
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
        const entity = new ImageLotr();
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

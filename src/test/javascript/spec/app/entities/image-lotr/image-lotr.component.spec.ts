/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IslotrTestModule } from '../../../test.module';
import { ImageLotrComponent } from 'app/entities/image-lotr/image-lotr.component';
import { ImageLotrService } from 'app/entities/image-lotr/image-lotr.service';
import { ImageLotr } from 'app/shared/model/image-lotr.model';

describe('Component Tests', () => {
  describe('ImageLotr Management Component', () => {
    let comp: ImageLotrComponent;
    let fixture: ComponentFixture<ImageLotrComponent>;
    let service: ImageLotrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ImageLotrComponent],
        providers: []
      })
        .overrideTemplate(ImageLotrComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImageLotrComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageLotrService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ImageLotr(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.images[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

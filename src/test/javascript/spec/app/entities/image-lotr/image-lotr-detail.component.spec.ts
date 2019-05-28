/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IslotrTestModule } from '../../../test.module';
import { ImageLotrDetailComponent } from 'app/entities/image-lotr/image-lotr-detail.component';
import { ImageLotr } from 'app/shared/model/image-lotr.model';

describe('Component Tests', () => {
  describe('ImageLotr Management Detail Component', () => {
    let comp: ImageLotrDetailComponent;
    let fixture: ComponentFixture<ImageLotrDetailComponent>;
    const route = ({ data: of({ image: new ImageLotr(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ImageLotrDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ImageLotrDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImageLotrDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.image).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IslotrTestModule } from '../../../test.module';
import { ImageLotrDeleteDialogComponent } from 'app/entities/image-lotr/image-lotr-delete-dialog.component';
import { ImageLotrService } from 'app/entities/image-lotr/image-lotr.service';

describe('Component Tests', () => {
  describe('ImageLotr Management Delete Component', () => {
    let comp: ImageLotrDeleteDialogComponent;
    let fixture: ComponentFixture<ImageLotrDeleteDialogComponent>;
    let service: ImageLotrService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ImageLotrDeleteDialogComponent]
      })
        .overrideTemplate(ImageLotrDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImageLotrDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageLotrService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});

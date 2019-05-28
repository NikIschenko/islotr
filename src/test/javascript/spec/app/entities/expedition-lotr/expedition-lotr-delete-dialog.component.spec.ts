/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IslotrTestModule } from '../../../test.module';
import { ExpeditionLotrDeleteDialogComponent } from 'app/entities/expedition-lotr/expedition-lotr-delete-dialog.component';
import { ExpeditionLotrService } from 'app/entities/expedition-lotr/expedition-lotr.service';

describe('Component Tests', () => {
  describe('ExpeditionLotr Management Delete Component', () => {
    let comp: ExpeditionLotrDeleteDialogComponent;
    let fixture: ComponentFixture<ExpeditionLotrDeleteDialogComponent>;
    let service: ExpeditionLotrService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [ExpeditionLotrDeleteDialogComponent]
      })
        .overrideTemplate(ExpeditionLotrDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpeditionLotrDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpeditionLotrService);
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

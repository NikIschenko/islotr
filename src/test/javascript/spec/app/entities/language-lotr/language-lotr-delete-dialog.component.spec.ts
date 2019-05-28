/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IslotrTestModule } from '../../../test.module';
import { LanguageLotrDeleteDialogComponent } from 'app/entities/language-lotr/language-lotr-delete-dialog.component';
import { LanguageLotrService } from 'app/entities/language-lotr/language-lotr.service';

describe('Component Tests', () => {
  describe('LanguageLotr Management Delete Component', () => {
    let comp: LanguageLotrDeleteDialogComponent;
    let fixture: ComponentFixture<LanguageLotrDeleteDialogComponent>;
    let service: LanguageLotrService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IslotrTestModule],
        declarations: [LanguageLotrDeleteDialogComponent]
      })
        .overrideTemplate(LanguageLotrDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LanguageLotrDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LanguageLotrService);
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILanguageLotr } from 'app/shared/model/language-lotr.model';
import { LanguageLotrService } from './language-lotr.service';

@Component({
  selector: 'jhi-language-lotr-delete-dialog',
  templateUrl: './language-lotr-delete-dialog.component.html'
})
export class LanguageLotrDeleteDialogComponent {
  language: ILanguageLotr;

  constructor(
    protected languageService: LanguageLotrService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.languageService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'languageListModification',
        content: 'Deleted an language'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-language-lotr-delete-popup',
  template: ''
})
export class LanguageLotrDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ language }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LanguageLotrDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.language = language;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/language-lotr', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/language-lotr', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}

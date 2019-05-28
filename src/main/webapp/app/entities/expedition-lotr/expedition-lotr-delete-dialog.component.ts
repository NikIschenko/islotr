import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpeditionLotr } from 'app/shared/model/expedition-lotr.model';
import { ExpeditionLotrService } from './expedition-lotr.service';

@Component({
  selector: 'jhi-expedition-lotr-delete-dialog',
  templateUrl: './expedition-lotr-delete-dialog.component.html'
})
export class ExpeditionLotrDeleteDialogComponent {
  expedition: IExpeditionLotr;

  constructor(
    protected expeditionService: ExpeditionLotrService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.expeditionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'expeditionListModification',
        content: 'Deleted an expedition'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-expedition-lotr-delete-popup',
  template: ''
})
export class ExpeditionLotrDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expedition }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExpeditionLotrDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.expedition = expedition;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/expedition-lotr', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/expedition-lotr', { outlets: { popup: null } }]);
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

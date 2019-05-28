import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnitLotr } from 'app/shared/model/unit-lotr.model';
import { UnitLotrService } from './unit-lotr.service';

@Component({
  selector: 'jhi-unit-lotr-delete-dialog',
  templateUrl: './unit-lotr-delete-dialog.component.html'
})
export class UnitLotrDeleteDialogComponent {
  unit: IUnitLotr;

  constructor(protected unitService: UnitLotrService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.unitService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'unitListModification',
        content: 'Deleted an unit'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-unit-lotr-delete-popup',
  template: ''
})
export class UnitLotrDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ unit }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UnitLotrDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.unit = unit;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/unit-lotr', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/unit-lotr', { outlets: { popup: null } }]);
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

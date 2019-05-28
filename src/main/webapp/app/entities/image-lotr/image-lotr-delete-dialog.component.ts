import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImageLotr } from 'app/shared/model/image-lotr.model';
import { ImageLotrService } from './image-lotr.service';

@Component({
  selector: 'jhi-image-lotr-delete-dialog',
  templateUrl: './image-lotr-delete-dialog.component.html'
})
export class ImageLotrDeleteDialogComponent {
  image: IImageLotr;

  constructor(protected imageService: ImageLotrService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.imageService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'imageListModification',
        content: 'Deleted an image'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-image-lotr-delete-popup',
  template: ''
})
export class ImageLotrDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ image }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ImageLotrDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.image = image;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/image-lotr', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/image-lotr', { outlets: { popup: null } }]);
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

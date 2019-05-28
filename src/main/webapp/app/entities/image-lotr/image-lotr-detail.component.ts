import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IImageLotr } from 'app/shared/model/image-lotr.model';

@Component({
  selector: 'jhi-image-lotr-detail',
  templateUrl: './image-lotr-detail.component.html'
})
export class ImageLotrDetailComponent implements OnInit {
  image: IImageLotr;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.image = image;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
